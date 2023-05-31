import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {NavbarComponent} from "../../components/navbar/navbar.component";

@NgModule({
  declarations: [HomeLayoutComponent],
  imports: [CommonModule, BrowserModule, HomeRoutingModule, RouterModule, NavbarComponent],
})
export class HomeModule {}
