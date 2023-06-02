import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsLayoutComponent } from './pages/settings-layout/settings-layout.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SettingsLayoutComponent,
    canActivate: [AuthGuard],

    children: [{ path: 'settings', component: SettingsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
