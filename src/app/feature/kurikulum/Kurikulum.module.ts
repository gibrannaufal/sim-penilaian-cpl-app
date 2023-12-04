import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KurikulumComponent } from './component/kurikulum/kurikulum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [KurikulumComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
    SharedModule
  ],
  exports: [
  ]
})
export class KurikulumModule { }
