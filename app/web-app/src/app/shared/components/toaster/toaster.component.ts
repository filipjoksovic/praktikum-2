import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToasterService } from '../../../services/toaster.service';
import { ToastMessage, ToastMessageType } from '../../../models/toaster.model';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
})
export class ToasterComponent {
  protected readonly faTimes = faTimes;
  public messages$ = this.toasterService.messages$;

  public constructor(private toasterService: ToasterService) {}

  protected readonly ToastMessageType = ToastMessageType;



  dispose(message: ToastMessage) {
    of(null).pipe(delay(3000)).subscribe(()=>this.toasterService.removeMessage(message));
  }
}
