import { Component } from '@angular/core';
import { ToasterService } from './services/toaster.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'web-app';

  constructor(private toastService: ToasterService, private authService: AuthService) {}
}
