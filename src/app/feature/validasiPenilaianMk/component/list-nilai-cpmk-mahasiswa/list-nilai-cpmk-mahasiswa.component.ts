import { Component, OnInit , ViewChild, Input , Output , EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { SubCpmkService } from 'src/app/feature/subCpmk/service/sub-cpmk.service';
import { ValidasiPenilaianMkService } from '../../service/validasi-penilaian-mk.service';
import { filterService } from 'src/app/core/services/filter.service';

import { DataTableDirective } from 'angular-datatables';

import { Router } from '@angular/router';

@Component({
  selector: 'app-list-nilai-cpmk-mahasiswa',
  templateUrl: './list-nilai-cpmk-mahasiswa.component.html',
  styleUrls: ['./list-nilai-cpmk-mahasiswa.component.scss']
})
export class ListNilaiCpmkMahasiswaComponent implements OnInit {
  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number; 
  @Input() uid: number; 

  @Output() afterSave = new EventEmitter<boolean>();


  istmk: [];
  titleModal: string;
  modelId: number;
  
  id_matakuliah: number;
  id_subcpmk: number;
  titleForm: string;
  showForm: boolean;
  listNilaiCpmk : any;
  
  constructor(
      private subCpmkService: SubCpmkService,
      private filterService: filterService,
      private validasiPenilaianMkService: ValidasiPenilaianMkService,
      private landaService: LandaService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.showForm = false;
  
    this.getmk();
    
  }


  getmk() {

    const params = {
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk : this.id_detailmk_fk
    }
    this.filterService.getPenilaianCpmk(params).subscribe((res: any) => {
      this.listNilaiCpmk = res;
      console.log('CPMKNYA ADALAH',this.listNilaiCpmk);
      
    }, err => {
      console.log(err);
    });
  }
  


}
