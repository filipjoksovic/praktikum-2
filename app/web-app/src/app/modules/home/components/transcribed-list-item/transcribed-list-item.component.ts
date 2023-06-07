import {Component, EventEmitter, Input, Output} from '@angular/core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-transcribed-list-item',
  templateUrl: './transcribed-list-item.component.html',
  styleUrls: ['./transcribed-list-item.component.scss'],
})
export class TranscribedListItemComponent {
  @Input()
  item: string;
  @Output()
  itemRemoved:EventEmitter<string> = new EventEmitter<string>();
  protected readonly faTimes = faTimes;

  removeItem() {
    this.itemRemoved.emit(this.item);
  }
}
