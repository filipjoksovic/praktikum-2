import { Component } from '@angular/core';
import { faDice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '../../../../shared/helpers';
import { interval } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FamilyService } from '../../../../services/family.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  protected readonly faPlus = faPlus;
  protected readonly faDice = faDice;

  public emailForm: FormGroup = this.fb.group({
    emailToAdd: new FormControl('', [Validators.email]),
  });
  public joinFamilyForm: FormGroup = this.fb.group({
    familyCode: new FormControl('', Validators.required),
  });

  public code = '';
  emailToAdd = '';
  emailsToAdd = [];

  public constructor(private fb: FormBuilder, private familyService: FamilyService) {}

  generateCode() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        this.code = generateRandomString();
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
}
