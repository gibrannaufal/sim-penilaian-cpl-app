import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { KurikulumService } from '../../service/kurikulum.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-kurikulum',
  templateUrl: './kurikulum.component.html',
  styleUrls: ['./kurikulum.component.scss']
})
export class KurikulumComponent implements OnInit {
  
    listKurikulum: [];
    titleModal: string;
    modelId: number;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;

    imageSource:any;
    filter: {
        nama_kurikulum: ''
      };

    constructor(
        private kurikulumService: KurikulumService,
        private landaService: LandaService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
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
 
    // createCustomer(modal) {
    //     this.titleModal = 'Tambah Customer';
    //     this.modelId = 0;
    //     this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    // }

    // updateCustomer(modal, customerModel) {
    //     this.titleModal = 'Edit Customer: ' + customerModel.nama;
    //     this.modelId = customerModel.id;
    //     this.modalService.open(modal, { size: 'lg', backdrop: 'static' });
    // }

    // deleteCustomer(userId) {
    //     Swal.fire({
    //         title: 'Apakah kamu yakin ?',
    //         text: 'Customer tidak dapat melakukan pesanan setelah kamu menghapus datanya',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#34c38f',
    //         cancelButtonColor: '#f46a6a',
    //         confirmButtonText: 'Ya, Hapus data ini !',
    //     }).then((result) => {
    //         if (result.value) {
    //             this.kurikulumService.deleteCustomer(userId).subscribe((res: any) => {
    //                 this.landaService.alertSuccess('Berhasil', res.message);
    //                 this.reloadDataTable();
    //             }, err => {
    //                 console.log(err);
    //             });
    //         }
    //     });
    // }
    reloadDataTable(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
     }
}
