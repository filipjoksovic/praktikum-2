import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {ShoppingListService} from './services/shopping-list.service';
import {VoiceService} from './services/voice.service';
import {ShoppingListsComponent} from './components/shopping-lists/shopping-lists.component';
import {PageDescriptorPillComponent} from './components/page-descriptor-pill/page-descriptor-pill.component';
import {HomeModule} from "./modules/home/home.module";

@NgModule({
  declarations: [AppComponent, HomeComponent, ShoppingListsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PageDescriptorPillComponent,
    NavbarComponent,
    HomeModule,
  ],
  providers: [ShoppingListService, VoiceService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
