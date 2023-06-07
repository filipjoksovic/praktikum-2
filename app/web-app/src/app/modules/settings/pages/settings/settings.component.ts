import { Component } from '@angular/core';
import {
  faCartShopping,
  faCodePullRequest,
  faDatabase,
  faDoorOpen,
  faPeopleGroup,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { mergeMap, shareReplay } from 'rxjs';
import { FamilyStoreService } from '../../../services/stores/family-store.service';
import { FamilyService } from '../../../../services/family.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  protected readonly faPeopleGroup = faPeopleGroup;

  constructor(private familyStore: FamilyStoreService, private familyService: FamilyService,
              private authService: AuthService    
    ) {}


  public user: User;

  ngOnInit() {
    this.authService.currentUser$.subscribe(user =>{
      this.user = user;
    })
  }
}
