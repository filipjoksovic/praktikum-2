import { Component } from '@angular/core';
import { faBan, faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '../../../../shared/helpers';
import { interval, mergeMap, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilyService } from '../../../../services/family.service';
import { FamilyStoreService } from '../../../services/stores/family-store.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  protected readonly faPlus = faPlus;
  protected readonly faDice = faDice;
  protected readonly faBan = faBan;

  public emailForm: FormGroup = this.fb.group({
    emailToAdd: new FormControl('', [Validators.email]),
  });
  public joinFamilyForm: FormGroup = this.fb.group({
    familyCode: new FormControl('', Validators.required),
  });

  public createFamilyForm = this.fb.group({
    familyName: new FormControl('', Validators.required),
    familyCode: new FormControl('', Validators.required),
  });

  public existingRequest$ = this.familyService.getRequestsForUser().pipe(
    mergeMap(() => this.familyStore.existingRequest$),
    tap((request) =>
      request !== null
        ? this.joinFamilyForm.disable({
            onlySelf: false,
            emitEvent: false,
          })
        : this.joinFamilyForm.enable({
            onlySelf: false,
            emitEvent: false,
          }),
    ),
  );
  code = '';
  emailToAdd = '';
  emailsToAdd = [];

  public constructor(
    private fb: FormBuilder,
    private familyService: FamilyService,
    private familyStore: FamilyStoreService,
    private router: Router,
  ) {}

  generateCode() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        this.createFamilyForm.patchValue({ familyCode: generateRandomString() });
      }, 100);
    }
  }

  public addEmail() {
    if (this.emailForm.valid) {
      this.emailsToAdd.push(this.emailForm.get('emailToAdd').value);
    } else {
      console.log('Invalid email');
    }
  }

  sendJoin() {
    this.familyService.sendRequest(this.joinFamilyForm.get('familyCode').value).subscribe();
  }

  cancelRequest(id: string) {
    this.familyService.cancelRequest(id).subscribe();
  }

  createFamily() {
    this.familyService
      .createFamily({
        name: this.createFamilyForm.get('familyName').value,
        inviteCode: this.createFamilyForm.get('familyCode').value,
      })
      .subscribe(() => {
        this.router.navigateByUrl('/family');
      });
  }
}
