import { Component, Input } from '@angular/core';
import { NgIf } from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-page-descriptor-pill',
  templateUrl: './page-descriptor-pill.component.html',
  imports: [NgIf],
})
export class PageDescriptorPillComponent {
  @Input()
  title: string;
  @Input()
  description: string;
}
