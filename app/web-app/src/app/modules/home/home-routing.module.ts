import {NgModule, inject} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from 'src/app/components/home/home.component';
import {AuthGuard} from 'src/app/guards/auth.guard';
import {HomeLayoutComponent} from './pages/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, canActivate: [() => inject(AuthGuard).canActivate()], children: [
      {path: '', component: HomeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
