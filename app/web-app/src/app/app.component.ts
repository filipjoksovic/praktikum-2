import { Component } from '@angular/core';
import { ToastMessage } from "./models/toaster.model";
import { ToasterService } from "./services/toaster.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-app';

  constructor(private toastService:ToasterService) {
  }


  toast() {
    this.toastService.success("Success!","Hello world!");
  }

  toastDanger() {
    this.toastService.error("Success!","Hello world!");

  }
  toastWarning() {
    this.toastService.warning("Success!","Hello world!");

  }
}
