import { Component } from '@angular/core';
import { TranscriptStoreService } from '../../../../services/stores/transcript-store.service';
import { mergeMap, pipe, tap } from 'rxjs';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transcribed-list',
  templateUrl: './transcribed-list.component.html',
  styleUrls: ['./transcribed-list.component.scss'],
})
export class TranscribedListComponent {
  public constructor(
    private transcriptStore: TranscriptStoreService,
    private shoppingListService: ShoppingListService,
    private router: Router,
  ) {}

  public items$ = this.transcriptStore.transcribedList$.pipe(tap((items) => console.log(items)));

  public listName = '';

  saveShoppingList() {
    this.transcriptStore.transcribedList$
      .pipe(
        mergeMap((list) =>
          this.shoppingListService.saveShoppingList({
            name: this.listName,
            items: list,
          }),
        ),
      )
      .subscribe(() => this.router.navigate(['/lists']));
  }

  onItemRemove(item: string) {
    this.transcriptStore.removeItem(item);
  }
}
