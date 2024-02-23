import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PenilaianMkService } from '../../service/penilaian-mk.service';
import { LandaService } from 'src/app/core/services/landa.service';

import Swal from 'sweetalert2';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-penilaian-mk',
  templateUrl: './penilaian-mk.component.html',
  styleUrls: ['./penilaian-mk.component.scss']
})
export class PenilaianMkComponent implements OnInit {
 
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      nama_mk: ''
    };
  
  titleModal: string;
  id_matakuliah: number;
  uid:string;
  showForm: boolean;

  mkId: number;
  listMk: any;
  listKelas: any;
  


  constructor(
    private penilaianMkService: PenilaianMkService,
    private landaService: LandaService,
    private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
    this.getMkApi();
    this. getKelas();
    this.filter = {
      nama_mk: '',
    
    };
  }
  
  getMkApi()
  {   
    const params = {}
    this.penilaianMkService.getMk(params).subscribe((res: any) => {
      this.listMk = res;
      console.log('MK APINYA ADALAH',this.listMk);
      
    }, err => {
      console.log(err);
    });
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

  lihatDetail(modalId, id_matakuliah , nama_matakuliah, uid ) {
    this.titleModal = 'List CPMK Mata Kuliah ' + nama_matakuliah ;
    this.id_matakuliah = id_matakuliah,
    this.uid = uid,
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
  }
}
