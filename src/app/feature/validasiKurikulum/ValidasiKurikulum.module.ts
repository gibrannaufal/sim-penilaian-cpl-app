import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidasiKurikulumComponent } from './component/validasi-kurikulum/validasi-kurikulum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCplComponent } from './component/list-cpl/list-cpl.component';
import { FormValidasiKurikulumComponent } from './component/form-validasi-kurikulum/form-validasi-kurikulum.component';

@NgModule({
  declarations: [ValidasiKurikulumComponent, ListCplComponent, FormValidasiKurikulumComponent],
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
export class ValidasiKurikulumModule { }
