import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { ShoppingListStoreService } from '../../../../services/stores/shopping-list-store.service';
import { fromEvent, Observable, take, tap } from 'rxjs';
import { faCheck, faCheckDouble, faEye, faPen, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { IListItem, IShoppingList } from '../../../../models/IShoppingListsResponseDTO';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
  @ViewChild('contextListsMenu', { static: true })
  public contextListstMenu: ElementRef;

  @ViewChild('contextSingleListMenu', { static: true })
  public contextSingleListMenu: ElementRef;

  public isEditSelectedList = false;
  public isEditSelectedListItem = false;

  public selectedList$ = this.shoppingListStore.selectedList$.pipe(
    tap((item) => (this.selectedId = (item && item.id) || '')),
  );
  public shoppingLists$ = this.shoppingListStore.shoppingLists$;
  public selectedId = '';
  public searchList: string;
  public idsForCheck: string[] = [];
  public allSelected = false;
  public listsContextActive = false;
  public listItemContextActive = false;
  public isEdit: boolean;
  public selectedListItem$: Observable<IListItem> = this.shoppingListStore.selectedItem$;

  protected readonly faTrash = faTrash;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faTimes = faTimes;
  protected readonly faCheck = faCheck;
  protected readonly faPen = faPen;
  protected readonly faCheckDouble = faCheckDouble;
  protected readonly faEye = faEye;
  protected readonly faSearch = faSearch;

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

  toggleEditMode() {
    console.log('editing');
    if (this.isEdit) {
      console.log('Should send req1uest');
      console.log(this.idsForCheck);
      this.shoppingListService.updateItemsStatus(this.selectedId, this.idsForCheck, this.allSelected).subscribe();
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
    this.listsContextActive = true;
    event.preventDefault();
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'top', event.y + 'px');
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'left', event.x + 'px');

    fromEvent(window, 'click')
      .pipe(take(1))
      .subscribe((event: any) => {
        if (!event.target.className.includes('context-menu')) {
          this.listsContextActive = false;
          this.renderer.setStyle(this.contextListstMenu.nativeElement, 'top', -1000 + 'px');
          this.renderer.setStyle(this.contextListstMenu.nativeElement, 'left', -1000 + 'px');
          this.isEditSelectedList = false;
        }
      });
  }

  listItemRightClick(event: MouseEvent, item: IListItem) {
    this.shoppingListStore.setSelectedItem(item);
    this.listItemContextActive = true;
    event.preventDefault();
    this.renderer.setStyle(this.contextSingleListMenu.nativeElement, 'top', event.y + 'px');
    this.renderer.setStyle(this.contextSingleListMenu.nativeElement, 'left', event.x + 'px');
    fromEvent(window, 'click')
      .pipe(take(1))
      .subscribe((event: any) => {
        if (!event.target.className.includes('context-menu')) {
          this.listItemContextActive = false;
          this.renderer.setStyle(this.contextSingleListMenu.nativeElement, 'top', -1000 + 'px');
          this.renderer.setStyle(this.contextSingleListMenu.nativeElement, 'left', -1000 + 'px');
          this.isEditSelectedList = false;
        }
      });
  }

  editSelectedListName() {
    this.listsContextActive = false;
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'top', -1000 + 'px');
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'left', -1000 + 'px');
    this.isEditSelectedList = true;
  }

  deleteSelectedList() {
    this.listsContextActive = false;
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'top', -1000 + 'px');
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'left', -1000 + 'px');
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

  editSelectedListItemName() {
    this.listItemContextActive = false;
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'top', -1000 + 'px');
    this.renderer.setStyle(this.contextListstMenu.nativeElement, 'left', -1000 + 'px');
    this.isEditSelectedListItem = true;
  }

  deleteSelectedListItem() {}
}
