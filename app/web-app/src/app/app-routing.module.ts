import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { HomeRoutingModule } from './modules/home/home-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), HomeRoutingModule, AuthRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
