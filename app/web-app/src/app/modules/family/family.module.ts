import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyRoutingModule } from './family-routing.module';
import { FamilyLayoutComponent } from './pages/family-layout/family-layout.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FamilyComponent } from './pages/family/family.component';
import { PageDescriptorPillComponent } from '../../components/page-descriptor-pill/page-descriptor-pill.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JoinComponent } from './pages/join/join.component';
import { CreateComponent } from './pages/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FamilyDataComponent } from './pages/family-data/family-data.component';
import { FamilyMembersComponent } from './pages/family-members/family-members.component';
import { FamilyRequestsComponent } from './pages/family-requests/family-requests.component';
import { FamilyListComponent } from './pages/family-list/family-list.component';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    FamilyLayoutComponent,
    FamilyComponent,
    JoinComponent,
    CreateComponent,
    FamilyDataComponent,
    FamilyMembersComponent,
    FamilyRequestsComponent,
    FamilyListComponent,
  ],
  imports: [
    CommonModule,
    FamilyRoutingModule,
    NavbarComponent,
    PageDescriptorPillComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FamilyModule {}
