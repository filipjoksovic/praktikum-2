import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transcribed-list-item',
  templateUrl: './transcribed-list-item.component.html',
  styleUrls: ['./transcribed-list-item.component.scss'],
})
export class TranscribedListItemComponent {
  @Input()
  item: string;
}
