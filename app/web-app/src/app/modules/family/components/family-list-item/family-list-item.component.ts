import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faCheck, faPen, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ListItemDTOV2} from '../../../../models/IShoppingListsResponseDTO';
import {ShoppingListStoreService} from '../../../../services/stores/shopping-list-store.service';
import {ShoppingListService} from '../../../../services/shopping-list.service';
import {mergeMap, tap} from 'rxjs';
import { ImageCacheService } from 'src/app/services/image-cache-service.service';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'app-family-list-item',
  templateUrl: './family-list-item.component.html',
  styleUrls: ['./family-list-item.component.scss'],
  animations: [
    trigger('fade', [
      transition(':leave', [
        animate('0.5s ease-in-out', style({ opacity: 0, transform: 'scale(0.5)' }))
      ])
    ])
  ]
  
})

export class FamilyListItemComponent implements OnInit {
  @Input()
  public item: ListItemDTOV2;
  @Input()
  public familyId: string;
  @Input()
  public listId: string;
  @Output()
  public itemDeleted = new EventEmitter<ListItemDTOV2>();
  public isEdit = false;

  protected readonly faTrash = faTrash;
  protected readonly faTimes = faTimes;
  protected readonly faCheck = faCheck;
  protected readonly faPen = faPen;
  private backupName: string;
  public isDeleting: boolean;
  private imageCache = {};


  constructor(private shoppingListStore: ShoppingListStoreService, private shoppingListService: ShoppingListService, private imageCacheService: ImageCacheService) {
  }

  ngOnInit() {
    this.backupName = this.item.name;
    this.searchPhotos();
  }

  searchPhotos() {
    if (this.item.name in this.imageCacheService.imageCache) {
      this.item.photoSrc = this.imageCacheService.imageCache[this.item.name];
    } else {
      console.log("Calling for the first time..");
      this.imageCacheService.getImageForItem(this.item.name).subscribe({
        next: (imageSrc) => {
          this.item.photoSrc = imageSrc;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    // this.item.photoSrc = 'https://picsum.photos/200'; use this for testing so you dont make pexels api mad :)
  } 
  
  enableEdit() {
    this.isEdit = true;
  }

  deleteItem() {
    this.shoppingListService
      .deleteFamilyItem(this.listId, this.item.id)
      .subscribe(() => {
        // start animation
        this.isDeleting = true;
  
        // delay emitting delete event until after animation has time to complete
        setTimeout(() => this.itemDeleted.emit(this.item), 500);
      });
  }
  
  

  checkOffItem() {
    this.shoppingListService
      .checkOffFamilyItem(this.listId, this.item.id)
      .pipe(tap(() => (this.item.checked = true)))
      .subscribe();
  }

  uncheckItem() {
    this.shoppingListService
    .uncheckFamilyItem(this.listId, this.item.id)
    .pipe(tap(() => (this.item.checked = false)))
    .subscribe();  }

  editName() {
    this.isEdit = false;
    if (this.backupName === this.item.name) {
      return;
    }
    this.shoppingListService
      .updateItem(this.listId, this.item.id, {id: this.item.id, name: this.item.name, checked: this.item.checked})
      .subscribe((shoppingList) => {
        this.backupName = this.item.name;
      });
  }
}
