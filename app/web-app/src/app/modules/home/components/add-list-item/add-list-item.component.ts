import { Component } from '@angular/core';
import { TranscriptStoreService } from '../../../../services/stores/transcript-store.service';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.scss'],
})
export class AddListItemComponent {
  constructor(private transcriptStore: TranscriptStoreService) {}

  public item = '';

  public addItem() {
    console.log('adding', this.item);
    this.transcriptStore.addToList(this.item);
  }

  protected readonly faPlus = faPlus;
}
