import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PenilaianMkComponent } from './component/penilaian-mk/penilaian-mk.component';
import { ListDetailComponent } from './component/list-detail/list-detail.component';
import { ListPenilaianSubCpmkComponent } from './component/list-penilaian-sub-cpmk/list-penilaian-sub-cpmk.component';
import { FormPenilaianComponent } from './component/form-penilaian/form-penilaian.component';


@NgModule({
  declarations: [
    PenilaianMkComponent,
    ListDetailComponent,
    ListPenilaianSubCpmkComponent,
    FormPenilaianComponent
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
export class PenilaianMkModule { }
