import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { RekapNilaiMahasiswaComponent } from './component/rekap-nilai-mahasiswa/rekap-nilai-mahasiswa.component';
import { DetailNilaiCpmkMahasiswaComponent } from './component/detail-nilai-cpmk-mahasiswa/detail-nilai-cpmk-mahasiswa.component';

@NgModule({
  declarations: [
    RekapNilaiMahasiswaComponent,
    DetailNilaiCpmkMahasiswaComponent
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
export class RekapNilaiByMahasiswaModule { }
