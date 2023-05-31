import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TranscribedListComponent } from './components/transcribed-list/transcribed-list.component';
import { TranscribedListItemComponent } from './components/transcribed-list-item/transcribed-list-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeLayoutComponent, TranscribedListComponent, TranscribedListItemComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NavbarComponent,
    FormsModule,
  ],
  exports: [TranscribedListComponent],
})
export class HomeModule {}
