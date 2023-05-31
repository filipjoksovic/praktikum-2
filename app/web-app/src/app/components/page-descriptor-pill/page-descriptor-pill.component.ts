import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-descriptor-pill',
  templateUrl: './page-descriptor-pill.component.html',
})
export class PageDescriptorPillComponent {
  @Input()
  title: string;
  @Input()
  description: string;
}
