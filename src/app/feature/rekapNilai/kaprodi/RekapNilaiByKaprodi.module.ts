import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RekapNilaiByKapordiComponent } from './component/rekap-nilai-by-kapordi/rekap-nilai-by-kapordi.component';
import { ListRekapNilaiCpmkComponent } from './component/list-rekap-nilai-cpmk/list-rekap-nilai-cpmk.component';
import { ListRekapNilaiSubCpmkComponent } from './component/list-rekap-nilai-sub-cpmk/list-rekap-nilai-sub-cpmk.component';
import { ListRekapNilaiMatkulComponent } from './component/list-rekap-nilai-matkul/list-rekap-nilai-matkul.component';


@NgModule({
  declarations: [
  
    RekapNilaiByKapordiComponent,
       ListRekapNilaiCpmkComponent,
       ListRekapNilaiSubCpmkComponent,
       ListRekapNilaiMatkulComponent
  ],
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
export class RekapNilaiByKaprodiModule { }
