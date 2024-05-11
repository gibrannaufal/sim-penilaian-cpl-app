import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { MataKuliahService } from '../../service/mata-kuliah.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-mata-kuliah',
  templateUrl: './mata-kuliah.component.html',
  styleUrls: ['./mata-kuliah.component.scss']
})
export class MataKuliahComponent implements OnInit {

  listmk: [];
  titleModal: string;
  modelId: number;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      nama_mk: ''
    };
  
  titleForm: string;
  mkId: number;
  mkStatus:  string;
  showForm: boolean;
  
  constructor(
      private mataKuliahService: MataKuliahService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      nama_mk: '',
    
    };
      this.getmk();
  }

  getmk() {
      this.dtOptions = {
          serverSide: true,
          processing: true,
          ordering: false,
          pageLength: 4,
          ajax: (dtParams: any, callback) => {
            const params = {
              nama_mk: this.filter.nama_mk,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            this.mataKuliahService.getmk(params).subscribe((res: any) => {
              const { list, meta } = res.data;
       
              let number = dtParams.start + 1;
              list.forEach(val => {
                val.no = number++;
              });
              this.listmk  = list;
       
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
  trackByIndex(index, list): any {
    return list.id;
  }

  formCreate() {
    this.showForm = true;
    this.titleForm = 'Tambah Matakuliah';
    this.mkId = 0;
  }

  formUpdate(mk) {
    this.showForm = true;
    this.titleForm = 'Edit Matakuliah: ' + mk.nama_matakuliah;
    this.mkId = mk.id_matakuliah;
    this.mkStatus = mk.status;
    console.log(this.mkId);
    
  }

  deleteKurikulum(mkId) {
      Swal.fire({
          title: 'Apakah kamu yakin ?',
          text: 'Menghapus Data Matakuliah akan menghapus Data detail mata kuliah',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#f46a6a',
          confirmButtonText: 'Ya, Hapus data ini !',
      }).then((result) => {
          if (result.value) {
              this.mataKuliahService.deleteMk(mkId).subscribe((res: any) => {
                  this.landaService.alertSuccess('Berhasil', res.message);
                  this.reloadDataTable();
              }, err => {
                  console.log(err);
              });
          }
      });
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }
}
