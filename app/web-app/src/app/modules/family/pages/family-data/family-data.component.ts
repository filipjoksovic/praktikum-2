import { Component } from '@angular/core';
import { faBan, faCheck, faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '../../../../shared/helpers';
import { FamilyStoreService } from '../../../services/stores/family-store.service';
import { FamilyService } from '../../../../services/family.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { mergeMap, shareReplay, tap } from 'rxjs';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk';
import { JoinRequestDTO } from '../../../../models/JoinRequestDTO';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-family-data',
  templateUrl: './family-data.component.html',
  styleUrls: ['./family-data.component.scss'],
})
export class FamilyDataComponent {
  public code = '';
  public emailsToAdd: string[] = [];
  public selectedTab: 'members' | 'requests' = 'members';
  private isOwner: boolean;
  public familyOwner: string;
  private familyId: string;

  public family$ = this.familyService.getFamily().pipe(
    tap((family) => {
      this.familyStore.setFamily(family);
      this.familyForm.setValue({ familyName: family.name, inviteCode: family.inviteCode });
      this.familyOwner = family.owner.id;
      this.familyId = family.id;
      this.isOwner = this.familyOwner === this.user.id;
    }),
    mergeMap((family) => {
      this.familyStore.setFamily(family);
      return this.familyStore.family$;
    }),
    shareReplay(),
  ); // pogledaj ovo 

  public user = this.authService.getLocalUser();

  public pendingRequests$ = this.familyStore.pendingRequests$.pipe(shareReplay());

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

  protected readonly faDice = faDice;
  protected readonly faPlus = faPlus;
  protected readonly faBan = faBan;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faCheck = faCheck;

  constructor(
    private familyStore: FamilyStoreService,
    private familyService: FamilyService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {

  }

  public addEmail() {
    this.emailsToAdd.push(this.emailForm.get('emailToAdd').value);
    this.emailForm.reset();
  }

  public generateCode() {
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
    this.familyService.getRequests().subscribe()
  }

  public editFamilyEmail() {
    //todo implement isSame check
    this.familyService.updateFamily({ name: this.familyForm.get('familyName').value }).subscribe();
  }

  public editFamilyCode() {
    this.familyService.updateFamilyCode(this.familyForm.get('inviteCode').value).subscribe();
  }

  public deleteFamily() {
    this.familyService.deleteFamily(this.familyId).subscribe();
  }

  public leaveFamily() {
    this.familyService.leaveFamily(this.familyId, this.user).subscribe();
  }

  rejectRequest(request: JoinRequestDTO) {
    this.familyService.rejectRequest(request).subscribe();
  }

  acceptRequest(request: JoinRequestDTO) {
    this.familyService.acceptRequest(request).subscribe();
  }

  removeUser(member: User) {
    this.familyService.removeUser(this.user.familyId, member).subscribe();
  }

  inviteMembers() {
    this.familyService.inviteMembers(this.emailsToAdd).subscribe();
  }
}
function ngOnInit(): (target: FamilyDataComponent, propertyKey: "") => void {
  throw new Error('Function not implemented.');
}

