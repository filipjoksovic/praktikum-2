import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'auth', component: AuthComponent },
  {path: '**', component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
