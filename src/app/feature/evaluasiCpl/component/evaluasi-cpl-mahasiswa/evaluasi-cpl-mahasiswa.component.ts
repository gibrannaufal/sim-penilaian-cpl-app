import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { EvaluasiCplService } from '../../service/evaluasi-cpl.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
import { filterService } from 'src/app/core/services/filter.service';
import { AuthService } from 'src/app/feature/auth/services/auth.service';


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
  profile: any;
  
  constructor(
      private filterService: filterService,
      private evaluasiCplService: EvaluasiCplService,
      private authService: AuthService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      kurikulum: '',
      kode_cpl: ''
    
    };
    this.getRoles();
    this.getCpl();
    this.getKurikulum();

  }

  getRoles() {
    this.authService.getProfile().subscribe((user: any) => {
      this.profile = user;

      console.log('profile nya',this.profile);
      
    });
  }

  getCpl() {
    const param  = {
      nrp: this.profile.nrp,
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
