import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidasiMkComponent } from './component/validasi-mk/validasi-mk.component';
import { FormValidasiMkComponent } from './component/form-validasi-mk/form-validasi-mk.component';
import { ListDetailMkComponent } from './component/list-detail-mk/list-detail-mk.component';
import { ListSubCpmkComponent } from './component/list-sub-cpmk/list-sub-cpmk.component';

@NgModule({
  declarations: [
    ValidasiMkComponent,
    FormValidasiMkComponent,
    ListDetailMkComponent,
    ListSubCpmkComponent
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
export class ValidasiMkModule { }
