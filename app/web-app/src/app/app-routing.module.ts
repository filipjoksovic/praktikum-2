import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { HomeRoutingModule } from './modules/home/home-routing.module';
import { FamilyRoutingModule } from './modules/family/family-routing.module';
import { SettingsRoutingModule } from './modules/settings/settings-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'family',
    loadChildren: () => import('./modules/family/family.module').then((m) => m.FamilyModule),
  },
  {
    path: 'settings-layout',
    loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    AuthRoutingModule,
    FamilyRoutingModule,
    SettingsRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
