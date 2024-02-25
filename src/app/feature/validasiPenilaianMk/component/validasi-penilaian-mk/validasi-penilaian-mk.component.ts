import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { DataTableDirective } from 'angular-datatables';
import { ViewChild } from '@angular/core';

import { PenilaianMkService } from 'src/app/feature/penilaianMatakuliah/service/penilaian-mk.service';

@Component({
  selector: 'app-validasi-penilaian-mk',
  templateUrl: './validasi-penilaian-mk.component.html',
  styleUrls: ['./validasi-penilaian-mk.component.scss']
})
export class ValidasiPenilaianMkComponent implements OnInit{
  listKelas: [];
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
  uid: string;
  
  constructor(
      private penilaianMkService: PenilaianMkService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      nama_mk: '',
    
    };
      this.getKelas();
  }

  getKelas()
  {
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
        
        this.penilaianMkService.getKelas(params).subscribe((res: any) => {
          const { list, meta } = res.data;
   
          let number = dtParams.start + 1;
          list.forEach(val => {
            val.no = number++;
          });
          this.listKelas  = list;
   
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

  lihatDetail(modalId, id_matakuliah , nama_matakuliah, uid ) {
    this.titleModal = 'List CPMK Mata Kuliah ' + nama_matakuliah ;
    this.id_matakuliah = id_matakuliah,
    this.uid = uid,
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
  }
 

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }
}
