import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsLayoutComponent } from './pages/settings-layout/settings-layout.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
  declarations: [SettingsLayoutComponent, SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, NavbarComponent],
})
export class SettingsModule {}
