import { Component } from '@angular/core';
import { AccountSetupDTO } from 'src/app/models/AccountSetupDTO';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { FamilyService } from 'src/app/services/family.service';


@Component({
  selector: 'app-settings-data',
  templateUrl: './settings-data.component.html',
  styleUrls: ['./settings-data.component.scss']
})
export class SettingsDataComponent {

  constructor(private authService: AuthService, private familyService: FamilyService    
) {}
  
  public user: User;
  public familyName: string = "You do not belong to any family";

  public accountSetupDTO: AccountSetupDTO = {
    id: '',
    firstName: '',
    lastName: '',
    dob: ''
  };

  ngOnInit() {
    this.getUser()
    this.getFamilyName()
  }
 
  getUser() {
    this.authService.currentUser$.subscribe(user =>{
      this.user = user;
      this.accountSetupDTO.id = user.id
      this.accountSetupDTO.firstName = user.name
      this.accountSetupDTO.lastName = user.surname
      this.accountSetupDTO.dob = user.dob
    })
  }

  getFamilyName() {
    if (this.user.familyId !== null) {
      this.familyService.getFamily().subscribe(data =>{
        this.familyName = data.name
        console.log(this.familyName)
    })
    }
}

  setupAccount() {
    console.log(this.accountSetupDTO)
    this.authService.setupAccount(this.accountSetupDTO).subscribe();
  }
  


}
