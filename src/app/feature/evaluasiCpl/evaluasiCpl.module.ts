import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EvaluasiCplComponent } from './component/evaluasi-cpl/evaluasi-cpl.component';

@NgModule({
  declarations: [
    EvaluasiCplComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
    SharedModule,
    NgSelectModule
  ],
  exports: [
  ]
})
export class evaluasiCplModule { }
