import { Component, OnInit } from '@angular/core';
import { faBan, faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '../../../../shared/helpers';
import { FamilyStoreService } from '../../../services/stores/family-store.service';
import { FamilyService } from '../../../../services/family.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { mergeMap, tap } from 'rxjs';

@Component({
  selector: 'app-family-data',
  templateUrl: './family-data.component.html',
  styleUrls: ['./family-data.component.scss'],
})
export class FamilyDataComponent {
  public constructor(
    private familyStore: FamilyStoreService,
    private familyService: FamilyService,
    private fb: FormBuilder,
  ) {}

  protected readonly faDice = faDice;
  protected readonly faPlus = faPlus;
  code = '';
  emailsToAdd: string[] = [];
  selectedTab: 'members' | 'requests' = 'members';

  public family$ = this.familyService.getFamily().pipe(
    tap((family) => {
      this.familyStore.setFamily(family);
      this.familyForm.setValue({ familyName: family.name, inviteCode: family.inviteCode });
    }),
    mergeMap((family) => {
      this.familyStore.setFamily(family);
      return this.familyStore.family$;
    }),
  );

  public familyMembers$ = this.familyService.getMembers().pipe(
    tap((members) => this.familyStore.setFamilyMembers(members)),
    mergeMap((members) => this.familyStore.familyMembers$),
  );
  public emailForm = this.fb.group({
    emailToAdd: new FormControl('', [Validators.required, Validators.required]),
  });
  public familyForm = this.fb.group({
    familyName: new FormControl('', Validators.required),
    inviteCode: new FormControl('', Validators.required),
  });

  public addEmail() {}

  generateCode() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        this.familyForm.patchValue({ inviteCode: generateRandomString() });
      }, 100);
    }
  }

  public loadMembers() {
    this.selectedTab = 'members';
  }

  public loadRequests() {
    this.selectedTab = 'requests';
    this.familyService.getRequests().subscribe();
  }

  protected readonly faBan = faBan;
}
