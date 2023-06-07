import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { ShoppingListsComponent } from './pages/shopping-lists/shopping-lists.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'lists',
        component: ShoppingListsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
