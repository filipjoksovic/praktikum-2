import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsLayoutComponent } from './pages/settings-layout/settings-layout.component';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SettingsComponent } from './pages/settings/settings.component';
import { PageDescriptorPillComponent } from "../../components/page-descriptor-pill/page-descriptor-pill.component";
import { SettingsDataComponent } from './pages/settings-data/settings-data.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [SettingsLayoutComponent, SettingsComponent, SettingsDataComponent],
    imports: [CommonModule, SettingsRoutingModule, NavbarComponent, PageDescriptorPillComponent, FormsModule]
})
export class SettingsModule {}
