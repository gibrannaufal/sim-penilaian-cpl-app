import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MataKuliahComponent } from './component/mata-kuliah/mata-kuliah.component';
import { FormMataKuliahComponent } from './component/form-mata-kuliah/form-mata-kuliah.component';

@NgModule({
  declarations: [
  
    MataKuliahComponent,
       FormMataKuliahComponent
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
export class mataKuliahModule { }
