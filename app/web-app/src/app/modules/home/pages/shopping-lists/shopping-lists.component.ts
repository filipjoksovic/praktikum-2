import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { BehaviorSubject, fromEvent, take, tap } from 'rxjs';
import { faCheck, faCheckDouble, faEye, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { IShoppingList } from '../../../../models/IShoppingListsResponseDTO';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
  @ViewChild('contextMenu', { static: true })
  public contextMenu: ElementRef;
  idsForCheck: string[] = [];
  allSelected = false;
  faPen = faPen;

  public contextActive = false;
  protected readonly faTrash = faTrash;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faTimes = faTimes;
  protected readonly faCheck = faCheck;
  protected readonly faCheckDouble = faCheckDouble;

  isEditSelectedList = false;

  public selectedList$ = this.shoppingListStore.selectedList$.pipe(
    tap((item) => (this.selectedId = (item && item.id) || '')),
  );
  public shoppingLists$ = this.shoppingListStore.shoppingLists$;
  public selectedId = '';

  searchList: string;

  constructor(
    private shoppingListService: ShoppingListService,
    private shoppingListStore: ShoppingListStoreService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.shoppingListService
      .getUserShoppingLists()
      .pipe(tap((lists) => this.shoppingListStore.setShoppingLists(lists)))
      .subscribe();
  }

  getShoppingList(id) {
    console.log('get shopping list');
    this.shoppingListStore.setSelectedListById(id);
  }

  protected readonly faEye = faEye;

  protected readonly faSearch = faSearch;
  isEdit: boolean;

  toggleEditMode() {
    console.log('editing');
    if (this.isEdit) {
      console.log('Should send req1uest');
      console.log(this.idsForCheck);
    }
    this.isEdit = !this.isEdit;
  }

  addOrRemove(id: string) {
    if (this.idsForCheck.includes(id)) {
      this.idsForCheck = this.idsForCheck.filter((itemId) => itemId !== id);
    } else {
      this.idsForCheck.push(id);
    }
  }

  selectAll() {
    this.allSelected = !this.allSelected;
  }

  cancelEdit() {
    this.idsForCheck = [];
    this.isEdit = false;
    this.isEditSelectedList = false;
  }

  shouldDisplayAsChecked(item) {
    return this.allSelected || item.checked || this.idsForCheck.includes(item.id);
  }

  listRightClick(event: MouseEvent, list: IShoppingList) {
    this.shoppingListStore.setSelectedListById(list.id);
    this.contextActive = true;
    event.preventDefault();
    this.renderer.setStyle(this.contextMenu.nativeElement, 'top', event.y + 'px');
    this.renderer.setStyle(this.contextMenu.nativeElement, 'left', event.x + 'px');

    fromEvent(window, 'click')
      .pipe(take(1))
      .subscribe((event: any) => {
        if (!event.target.className.includes('context-menu')) {
          this.contextActive = false;
          this.renderer.setStyle(this.contextMenu.nativeElement, 'top', -1000 + 'px');
          this.renderer.setStyle(this.contextMenu.nativeElement, 'left', -1000 + 'px');
          this.isEditSelectedList = false;
        }
      });
  }

  editSelectedListName() {
    this.contextActive = false;
    this.renderer.setStyle(this.contextMenu.nativeElement, 'top', -1000 + 'px');
    this.renderer.setStyle(this.contextMenu.nativeElement, 'left', -1000 + 'px');
    this.isEditSelectedList = true;
  }

  deleteSelectedList() {
    this.contextActive = false;
    this.renderer.setStyle(this.contextMenu.nativeElement, 'top', -1000 + 'px');
    this.renderer.setStyle(this.contextMenu.nativeElement, 'left', -1000 + 'px');
  }

  updateSelectedList(selectedList: IShoppingList) {
    if (this.isEditSelectedList) {
      console.log('will edit');
      console.log(selectedList);
      this.isEditSelectedList = false;
      this.shoppingListService.updateShoppingList(selectedList.id, selectedList).subscribe((list: IShoppingList) => {
        this.shoppingListStore.updateShoppingList(list);
      });
    }
  }

  findLists() {
    this.shoppingListService
      .search(this.searchList)
      .pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.shoppingListStore.setShoppingLists(result);
      });
  }
}
