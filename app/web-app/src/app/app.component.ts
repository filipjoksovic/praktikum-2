import { Component, OnInit } from '@angular/core';
import { ToastMessage } from './models/toaster.model';
import { ToasterService } from './services/toaster.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web-app';

  constructor(private toastService: ToasterService, private authService: AuthService) {}

  ngOnInit() {
    // this.authService.getUser().subscribe();
  }
}
