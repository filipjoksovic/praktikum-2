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
  public allDeSelected = false;
  public listsContextActive = false;
  public listItemContextActive = false;
  public isEdit: boolean;
  public selectedListItem$: Observable<IListItem> = this.shoppingListStore.selectedItem$;
  public firstTimeOpening: boolean = true;
  public currentList: IShoppingList;
  public currentItemsList: IListItem[];


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
    this.shoppingListStore.setSelectedListById(id);
    this.currentList = this.shoppingListStore.getSelectedList();
    this.currentItemsList = this.currentList.itemList
    console.log(this.currentItemsList)
  }

  toggleEditMode() {
    if (this.isEdit) {
      console.log(this.allSelected)
      this.shoppingListService.bulkEdit(this.selectedId, this.currentItemsList, this.allSelected).subscribe();
    }
    this.isEdit = !this.isEdit;
  }

  addOrRemove(id: string) {
    const item = this.currentItemsList.find((item) => item.id === id);
    if (item) {
      item.checked = !item.checked;
    }
  }
  

  selectAll() {
    if (this.firstTimeOpening) {
      this.firstTimeOpening = false;
      this.allSelected = true;
      this.currentItemsList.forEach(item =>{
        item.checked = true;
      })
    }
    else if (this.allSelected) {
      this.allSelected = false;
      this.allDeSelected = true;
      this.currentItemsList.forEach(item =>{
        item.checked = false;
      })
      console.log(this.currentItemsList)
    }
    else {
      this.allSelected = true;
      this.allDeSelected = false;
      this.currentItemsList.forEach(item =>{
        item.checked = true;
      })
    }
  }

  cancelEdit() {
    this.idsForCheck = [];
    this.isEdit = false;
    this.isEditSelectedList = false;
    this.firstTimeOpening = true;
    this.allSelected = false;
  }

  shouldDisplayAsChecked(item) {
    return this.allSelected || (this.firstTimeOpening && item.checked);
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
    this.shoppingListService.deleteShoppingList(this.selectedId).subscribe();
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
