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

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent {
  public family$ = this.familyService.getFamily().pipe(
    mergeMap((family) => {
      this.familyStore.setFamily(family);
      return this.familyStore.family$;
    }),
    shareReplay(),
  );

  protected readonly faPlus = faPlus;
  protected readonly faPeopleGroup = faPeopleGroup;
  protected readonly faDoorOpen = faDoorOpen;
  protected readonly faDatabase = faDatabase;
  protected readonly faCodePullRequest = faCodePullRequest;
  protected readonly faCartShopping = faCartShopping;

  constructor(private familyStore: FamilyStoreService, private familyService: FamilyService) {}
}
