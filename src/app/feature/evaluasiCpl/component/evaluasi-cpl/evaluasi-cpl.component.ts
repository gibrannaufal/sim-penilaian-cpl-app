import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { EvaluasiCplService } from '../../service/evaluasi-cpl.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-evaluasi-cpl',
  templateUrl: './evaluasi-cpl.component.html',
  styleUrls: ['./evaluasi-cpl.component.scss']
})
export class EvaluasiCplComponent implements OnInit {
  
  listMahasiswa: [];
  showForm: boolean;
  titleForm: string;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      nama_mahasiswa: ''
    };

  nrp: any;
  
  constructor(
      private evaluasiCplService: EvaluasiCplService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      nama_mahasiswa: '',
    
    };
      this.getmahasiswa();
  }

  getmahasiswa() {
      this.dtOptions = {
          serverSide: true,
          processing: true,
          ordering: false,
          pageLength: 4,
          ajax: (dtParams: any, callback) => {
            const params = {
              nama_mahasiswa: this.filter.nama_mahasiswa,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            this.evaluasiCplService.getMahasiswa(params).subscribe((res: any) => {
              const { list, meta } = res.data;
       
              let number = dtParams.start + 1;
              list.forEach(val => {
                val.no = number++;
              });
              this.listMahasiswa  = list;
       
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

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }

   formRekap(nrp, nama_mahasiswa) {
    this.showForm = true;
    this.titleForm = 'List Rekap Nilai Mahasiswa ' + nama_mahasiswa;
    this.nrp = nrp;
  }

}
