import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgProgressModule } from 'ngx-progressbar';

import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { VerticalComponent } from './vertical/vertical.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LayoutComponent, FooterComponent, VerticalComponent, TopbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    NgProgressModule,
    NgbModule
  ],
  exports: []
})
export class LayoutsModule { }
