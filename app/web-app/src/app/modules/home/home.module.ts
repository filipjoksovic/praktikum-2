import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TranscribedListComponent } from './components/transcribed-list/transcribed-list.component';
import { TranscribedListItemComponent } from './components/transcribed-list-item/transcribed-list-item.component';
import { FormsModule } from '@angular/forms';
import { AddListItemComponent } from './components/add-list-item/add-list-item.component';
import { ShoppingListsComponent } from './pages/shopping-lists/shopping-lists.component';
import { PageDescriptorPillComponent } from '../../components/page-descriptor-pill/page-descriptor-pill.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    TranscribedListComponent,
    TranscribedListItemComponent,
    AddListItemComponent,
    ShoppingListsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    NavbarComponent,
    FormsModule,
    PageDescriptorPillComponent,
    FontAwesomeModule,
  ],
  exports: [TranscribedListComponent],
})
export class HomeModule {}
