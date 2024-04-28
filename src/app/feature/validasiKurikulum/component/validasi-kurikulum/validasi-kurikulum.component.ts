import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { KurikulumService } from 'src/app/feature/kurikulum/service/kurikulum.service';
import { ValidasiKurikulumService } from '../../service/validasi-kurikulum.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-validasi-kurikulum',
  templateUrl: './validasi-kurikulum.component.html',
  styleUrls: ['./validasi-kurikulum.component.scss']
})
export class ValidasiKurikulumComponent implements OnInit  {
  listKurikulum: [];
    titleModal: string;
    modelId: number;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    filter: {
        nama_kurikulum: ''
      };
    id_kurikulum_fk: number;
    showForm: any;

    constructor(
        private kurikulumService: KurikulumService,
        private validasiKurikulumService: ValidasiKurikulumService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
      this.showForm = false;
      this.filter = {
        nama_kurikulum: '',
      
      };
        this.getKurikulum();
    }
    getKurikulum() {
        this.dtOptions = {
            serverSide: true,
            processing: true,
            ordering: false,
            pageLength: 4,
            ajax: (dtParams: any, callback) => {
              const params = {
                nama_kurikulum: this.filter.nama_kurikulum,
                itemperpage: 4,
                per_page: dtParams.length,
                page: (dtParams.start / dtParams.length) + 1,
              };
              
              this.kurikulumService.getKurikulum(params).subscribe((res: any) => {
                const { list, meta } = res.data;
         
                let number = dtParams.start + 1;
                list.forEach(val => {
                  val.no = number++;
                });
                this.listKurikulum  = list;
         
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
 

    detailCpl(modalId, nama_matakuliah, id_kurikulum_fk) {
      this.titleModal = 'List Cpl Kurikulum ' + nama_matakuliah;
      this.id_kurikulum_fk = id_kurikulum_fk,
      this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    }
    

    diterimaKurikulum(kurikulumId) {
      const params = { id_kurikulum_fk: kurikulumId };
  
      Swal.fire({
          title: 'Apakah Anda yakin ?',
          text: 'Men-validasi Kurikulum ini ',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#f46a6a',
          confirmButtonText: 'Ya, validasi Kurikulum ini !',
      }).then((result) => {
          if (result.value) {
              
              this.validasiKurikulumService.diterimaKurikulum(params).subscribe((res: any) => {
                  this.landaService.alertSuccess('Berhasil', res.message);
                  this.reloadDataTable();
              }, err => {
                  console.log(err);
              });
          }
      });
    }

    ditolak(modalId, id_kurikulum_fk ) {
      this.id_kurikulum_fk = id_kurikulum_fk,
      this.modalService.open(modalId,{ size: 'sm', backdrop: 'static' });
    }
  

    reloadDataTable(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
     }

}
