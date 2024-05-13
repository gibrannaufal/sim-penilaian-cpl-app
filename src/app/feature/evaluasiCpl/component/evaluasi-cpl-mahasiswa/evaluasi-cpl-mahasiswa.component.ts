import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { EvaluasiCplService } from '../../service/evaluasi-cpl.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
import { filterService } from 'src/app/core/services/filter.service';


@Component({
  selector: 'app-evaluasi-cpl-mahasiswa',
  templateUrl: './evaluasi-cpl-mahasiswa.component.html',
  styleUrls: ['./evaluasi-cpl-mahasiswa.component.scss']
})
export class EvaluasiCplMahasiswaComponent implements OnInit {

  listCpl: [];
  listKurikulum = [];
  showForm: boolean;
  titleForm: string;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      kurikulum: '',
      kode_cpl: ''
    };

  nrp: any;
  
  constructor(
      private filterService: filterService,
      private evaluasiCplService: EvaluasiCplService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      kurikulum: '',
      kode_cpl: ''
    
    };
      this.getCpl();
      this.getKurikulum();
  }

  getCpl() {
    const param  = {
      nrp: '191136005',
      kode_cpl: this.filter.kode_cpl,
      kurikulum: this.filter.kurikulum,
    };
    this.evaluasiCplService.getCplMahasiswa(param).subscribe((res: any) => {
      this.listCpl = res.data.listPenilaian;
      
    }, err => {
      console.log(err);
    });
  }

  getKurikulum() {
    this.filterService.getKurikulumFilter().subscribe((res: any) => {
      this.listKurikulum = res
    }, err => {
      console.log(err);
    });
  }

  reloadTable(): void {
    this.getCpl();
   }
}
