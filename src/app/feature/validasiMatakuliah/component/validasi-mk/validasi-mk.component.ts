import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from '@angular/core';

import { MataKuliahService } from 'src/app/feature/mataKuliah/service/mata-kuliah.service';
import { ValidasiMkService } from '../../service/validasi-mk.service';

@Component({
  selector: 'app-validasi-mk',
  templateUrl: './validasi-mk.component.html',
  styleUrls: ['./validasi-mk.component.scss']
})
export class ValidasiMkComponent implements OnInit{

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
  showForm: boolean;
  id_matakuliah: number;
  
  constructor(
      private mataKuliahService: MataKuliahService,
      private landaService: LandaService,
      private validasiMkService: ValidasiMkService,
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

  diterimaMk(mkId) {
    const params = { id_matakuliah: mkId };

    Swal.fire({
        title: 'Apakah Anda yakin ?',
        text: 'Men-validasi mata kuliah ini ',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Ya, validasi mata kuliah ini !',
    }).then((result) => {
        if (result.value) {
            
            this.validasiMkService.diterimaMk(params).subscribe((res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                this.reloadDataTable();
            }, err => {
                console.log(err);
            });
        }
    });
  }

  ditolak(modalId, id_matakuliah , nama_matakuliah ) {
    this.id_matakuliah = id_matakuliah,
    this.modalService.open(modalId,{ size: 'sm', backdrop: 'static' });
  }

  detailMk(modalId, id_matakuliah , nama_matakuliah ) {
    this.titleForm = 'List Detail Mata kuliah ' + nama_matakuliah;
    this.id_matakuliah = id_matakuliah,
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }
}
