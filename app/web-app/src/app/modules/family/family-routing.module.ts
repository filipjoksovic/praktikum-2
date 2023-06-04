import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyLayoutComponent } from './pages/family-layout/family-layout.component';
import { FamilyComponent } from './pages/family/family.component';
import { AuthGuard } from '../../guards/auth.guard';
import { JoinComponent } from './pages/join/join.component';
import { CreateComponent } from './pages/create/create.component';
import { FamilyDataComponent } from './pages/family-data/family-data.component';
import { FamilyListComponent } from './pages/family-list/family-list.component';
import { FamilyMembersComponent } from './pages/family-members/family-members.component';
import { FamilyRequestsComponent } from './pages/family-requests/family-requests.component';
import { HasFamilyGuard } from "../../guards/has-family.guard";

const routes: Routes = [
  {
    path: '',
    component: FamilyLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'family',
        component: FamilyComponent,
      },
      {
        path: 'family/join',
        component: JoinComponent,
      },
      {
        path: 'family/create',
        component: CreateComponent,
      },
      {
        path: 'family/data',
        component: FamilyDataComponent, canActivate:[HasFamilyGuard],
      },
      { path: 'family/list', component: FamilyListComponent, canActivate: [AuthGuard] },
      {
        path: 'family/members',
        component: FamilyMembersComponent,
      },
      {
        path: 'family/requests',
        component: FamilyRequestsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyRoutingModule {}
