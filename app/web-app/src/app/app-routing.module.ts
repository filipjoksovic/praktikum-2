import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { ShoppingListsComponent } from './components/shopping-lists/shopping-lists.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
  { path: 'lists', component: ShoppingListsComponent, canActivate: [() => inject(AuthGuard).canActivate()] },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }