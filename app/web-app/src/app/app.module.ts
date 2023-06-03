import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ShoppingListService } from './services/shopping-list.service';
import { VoiceService } from './services/voice.service';
import { PageDescriptorPillComponent } from './components/page-descriptor-pill/page-descriptor-pill.component';
import { HomeModule } from './modules/home/home.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { httpInterceptorProviders } from './interceptors';
import { ToasterComponent } from './shared/components/toaster/toaster.component';
import { ToastMessageComponent } from './shared/components/toast-message/toast-message.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ToasterComponent, ToastMessageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PageDescriptorPillComponent,
    NavbarComponent,
    HomeModule,
    FontAwesomeModule,
  ],
  providers: [ShoppingListService, VoiceService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
