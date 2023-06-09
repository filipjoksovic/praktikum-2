import { Component } from '@angular/core';
import { TranscriptStoreService } from '../../../../services/stores/transcript-store.service';
import { mergeMap, pipe, tap } from 'rxjs';
import { ShoppingListService } from '../../../../services/shopping-list.service';
import { Router } from '@angular/router';
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";

@Component({
  selector: 'app-transcribed-list',
  templateUrl: './transcribed-list.component.html',
  styleUrls: ['./transcribed-list.component.scss'],
})
export class TranscribedListComponent {
  public items$ = this.transcriptStore.transcribedList$.pipe(tap((items) => console.log(items)));
  public listName = '';
  public activeSegment:'personal' | 'family';
  public showList = false;

  protected readonly faHome = faHome;
  protected readonly faUser = faUser;


  public constructor(
    private transcriptStore: TranscriptStoreService,
    private shoppingListService: ShoppingListService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.transcriptStore.showItems$.subscribe(data =>{
      this.showList = data;
    })
  }

  saveShoppingList() {
    this.transcriptStore.transcribedList$
      .pipe(
        mergeMap((list) =>

          this.shoppingListService.saveShoppingList({
            name: this.listName,
            items: list,
          },this.activeSegment),
        ),
      )
      .subscribe(() => this.router.navigate(['/lists']));
  }

  onItemRemove(item: string) {
    this.transcriptStore.removeItem(item);
  }

  setActiveSegment(segment:'family' | 'personal') {
    this.activeSegment = segment;
  }

}
