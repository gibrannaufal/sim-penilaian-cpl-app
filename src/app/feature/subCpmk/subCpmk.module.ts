import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubCpmkComponent } from './component/sub-cpmk/sub-cpmk.component';
import { FormSubCpmkComponent } from './component/form-sub-cpmk/form-sub-cpmk.component';
import { ListDetailMkComponent } from './component/list-detail-mk/list-detail-mk.component';
import { ListSubCpmkComponent } from './component/list-sub-cpmk/list-sub-cpmk.component';

@NgModule({
  declarations: [
  
  
    SubCpmkComponent,
           FormSubCpmkComponent,
           ListDetailMkComponent,
           ListSubCpmkComponent
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
export class subCpmkModule { }
