import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ProgressServiceService } from 'src/app/core/services/progress-service.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
    nama: '',
    nrp: ''
  };

  showForm: boolean;
  listUser: any;
  titleModal: string;
  userId: number;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private progressService: ProgressServiceService,
  ) { }

  ngOnInit(): void {
    this.filter = {
      nama: '',
      nrp: '',
    }
    this.getUser();
    this.showForm = false;
  }

  getUser() {
    this.dtOptions = {
        serverSide: true,
        processing: true,
        ordering: false,
        pageLength: 4,
        ajax: (dtParams: any, callback) => {
          const params = {
            nama: this.filter.nama,
            nrp: this.filter.nrp,
            itemperpage: 4,
            per_page: dtParams.length,
            page: (dtParams.start / dtParams.length) + 1,
          };
          
          this.userService.getUsers(params).subscribe((res: any) => {
            const { list, meta } = res.data;
     
            let number = dtParams.start + 1;
            list.forEach(val => {
              val.no = number++;
            });
            this.listUser  = list;
     
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

  createUser(modalId) {
    this.titleModal = 'Tambah User';
    this.userId = 0;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  updateUser(modalId, user) {
    this.titleModal = 'Edit User: ' + user.name;
    this.userId = user.id;
    this.modalService.open(modalId, { size: 'lg', backdrop: 'static' });
  }

  deleteUser(userId) {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      text: 'User ini tidak dapat login setelah kamu menghapus datanya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !',
    }).then((result) => {
      if (!result.value) return false;

      this.userService.deleteUser(userId).subscribe((res: any) => {
        this.getUser();
      });
    });
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }

  addRoles(modalId) {
    this.titleModal = 'Daftar Roles';
    this.showForm = true;
  }
}
