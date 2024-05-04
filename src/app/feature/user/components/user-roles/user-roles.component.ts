import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { LandaService } from 'src/app/core/services/landa.service';
import { UserService } from '../../services/user.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit{

  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Output() afterSave = new EventEmitter<boolean>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
    name: ''
  };

  showForm: boolean;
  listRoles: any;
  titleModal: string;
  rolesId: number;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private progressService: ProgressServiceService,
  ) { }

  ngOnInit(): void {
    this.filter = {
      name: ''
    }
    this.getRoles();
    this.showForm = true;
  }

  getRoles() {
    this.dtOptions = {
        serverSide: true,
        processing: true,
        ordering: false,
        pageLength: 4,
        ajax: (dtParams: any, callback) => {
          const params = {
            name: this.filter.name,
            itemperpage: 4,
            per_page: dtParams.length,
            page: (dtParams.start / dtParams.length) + 1,
          };
          
          this.userService.getRolesAll(params).subscribe((res: any) => {
            const { list, meta } = res.data;
     
            let number = dtParams.start + 1;
            list.forEach(val => {
              val.no = number++;
            });
            this.listRoles  = list;
     
            callback({
              recordsTotal: meta.total,
              recordsFiltered: meta.total,
              data: [],
            });
     
          }, (err: any) => {
            console.log(err);
          });
        },
      };
  }

  createRoles(modalId) {
    this.titleModal = 'Tambah Roles';
    this.showForm = true;
    this.rolesId = 0;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  updateRoles(modalId, roles) {
    this.titleModal = 'Edit Roles: ' + roles.name;
    this.showForm = true;
    this.rolesId = roles.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  deleteRoles(rolesId) {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      text: 'User Roles ini akan berubah menjadi member setelah kamu menghapus datanya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
      if (!result.value) return false;

      this.userService.deleteRoles(rolesId).subscribe((res: any) => {
        this.getRoles();
      });
    });
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }

}
