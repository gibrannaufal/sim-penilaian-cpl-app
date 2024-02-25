import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidasiPenilaianMkComponent } from './component/validasi-penilaian-mk/validasi-penilaian-mk.component';
import { ListCpmkValPenilaianComponent } from './component/list-cpmk-val-penilaian/list-cpmk-val-penilaian.component';
import { ListSubCpmkValPenilaianComponent } from './component/list-sub-cpmk-val-penilaian/list-sub-cpmk-val-penilaian.component';
import { ListNilaiMahasiswaComponent } from './component/list-nilai-mahasiswa/list-nilai-mahasiswa.component';
import { FormDitolakValidasiPenilaianComponent } from './component/form-ditolak-validasi-penilaian/form-ditolak-validasi-penilaian.component';


@NgModule({
  declarations: [
    ValidasiPenilaianMkComponent,
    ListCpmkValPenilaianComponent,
    ListSubCpmkValPenilaianComponent,
    ListNilaiMahasiswaComponent,
    FormDitolakValidasiPenilaianComponent
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
export class ValidasiPenilaianMkModule { }
