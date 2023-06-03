import { Component, Input, OnInit } from '@angular/core';
import { ToastMessage, ToastMessageType } from '../../../models/toaster.model';
import { ToasterService } from '../../../services/toaster.service';
import { delay, of } from 'rxjs';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
})
export class ToastMessageComponent implements OnInit {
  @Input()
  public message: ToastMessage;

  constructor(private toaster: ToasterService) {}

  ngOnInit() {
    of(null)
      .pipe(delay(3000))
      .subscribe(() => this.toaster.removeMessage(this.message));
  }

  protected readonly faTimes = faTimes;
  protected readonly ToastMessageType = ToastMessageType;

  removeMessage(message: ToastMessage) {
    this.toaster.removeMessage(message);
  }
}
