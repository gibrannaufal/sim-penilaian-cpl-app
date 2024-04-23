import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EvaluasiCplComponent } from './component/evaluasi-cpl/evaluasi-cpl.component';
import { ListRekapComponent } from './component/list-rekap/list-rekap.component';
import { ListNilaiCpmkComponent } from './component/list-nilai-cpmk/list-nilai-cpmk.component';
import { ListNilaiSubCpmkComponent } from './component/list-nilai-sub-cpmk/list-nilai-sub-cpmk.component';

@NgModule({
  declarations: [
  
    EvaluasiCplComponent,
       ListRekapComponent,
       ListNilaiCpmkComponent,
       ListNilaiSubCpmkComponent
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
