import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CpmkComponent } from './component/cpmk/cpmk.component';
import { FormCpmkComponent } from './component/form-cpmk/form-cpmk.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListCpmkComponent } from './component/list-cpmk/list-cpmk.component';

@NgModule({
  declarations: [
    CpmkComponent,
    FormCpmkComponent,
    ListCpmkComponent
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
export class CpmkModule { }
