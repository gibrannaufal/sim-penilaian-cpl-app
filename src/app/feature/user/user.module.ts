import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { UserRolesComponent } from './components/user-roles/user-roles.component';
import { FormUserRolesComponent } from './components/form-user-roles/form-user-roles.component';

@NgModule({
  declarations: [FormUserComponent, ListUserComponent, UserRolesComponent, FormUserRolesComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ]
})
export class UserModule { }
