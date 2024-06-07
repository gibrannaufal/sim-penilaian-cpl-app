import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LandaService } from 'src/app/core/services/landa.service';
import { CpmkService } from '../../service/cpmk.service';
import { filterService } from 'src/app/core/services/filter.service';

import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-cpmk',
  templateUrl: './cpmk.component.html',
  styleUrls: ['./cpmk.component.scss']
})
export class CpmkComponent implements OnInit  {

  listCpmk: [];
  titleModal: string;
  modelId: number;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      id_kurikulum: ''
    };
  
  kurikulum: [];
  titleForm: string;
  cpmkId: number;
  showForm: boolean;
  
  constructor(
      private CpmkService: CpmkService,
      private filterService: filterService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      id_kurikulum: '',
    
    };
      this.getCpmk();
      this.getKurikulum();    
  }

  getKurikulum()
  {
    this.CpmkService.getKurikulumFilterAll().subscribe((res: any) => {
      this.kurikulum = res;
      
    }, err => {
      console.log(err);
    });
  }

  getCpmk() {
      this.dtOptions = {
          serverSide: true,
          processing: true,
          ordering: false,
          pageLength: 4,
          ajax: (dtParams: any, callback) => {
            if (!this.filter.id_kurikulum) {
              // If empty, don't make the API call and callback with empty data
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
              });
              return;
            }

            const params = {
              id_kurikulum: this.filter.id_kurikulum,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            
            this.CpmkService.getCpmk(params).subscribe((res: any) => {
              const { list, meta } = res.data;
       
              let number = dtParams.start + 1;
              list.forEach(val => {
                val.no = number++;
              });
              this.listCpmk  = list;
              console.log(this.listCpmk);
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
    this.titleForm = 'Tambah CPMK';
    this.cpmkId = 0;
  }

  formUpdate(cpmk) {
    this.showForm = true;
    this.titleForm = 'Edit CPMK: ' + cpmk.deskripsi_cpmk;
    this.cpmkId = cpmk.id_cpmk;

  }

  deleteCpmk(cpmkId) {
      Swal.fire({
          title: 'Apakah kamu yakin ?',
          text: 'Menghapus Data CPMK',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#34c38f',
          cancelButtonColor: '#f46a6a',
          confirmButtonText: 'Ya, Hapus data ini !',
      }).then((result) => {
          if (result.value) {
              this.CpmkService.deleteCpmk(cpmkId).subscribe((res: any) => {
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
