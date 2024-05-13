import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { filterService } from 'src/app/core/services/filter.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-list-rekap-nilai-cpmk',
  templateUrl: './list-rekap-nilai-cpmk.component.html',
  styleUrls: ['./list-rekap-nilai-cpmk.component.scss']
})
export class ListRekapNilaiCpmkComponent implements OnInit {
  @Input() nrp: number;
  @Input() id_mk_fk: number;
  @Input() nama_mahasiswa: number;
  @Output() afterSave = new EventEmitter<boolean>();

  rekapNilaiCpmk: [];
  
  titleModal: any;
  id_detailmk_fk: any;
  
  constructor(
      private filterService: filterService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
      this.getRekapNilaiCpmk();
  }

  getRekapNilaiCpmk()
  {   
    const params = {
      nrp: this.nrp,
      id_mk_fk: this.id_mk_fk,
    }
    console.log(params);
    
    this.filterService.getPenilaianCpmk(params).subscribe((res: any) => {
      this.rekapNilaiCpmk = res;
      console.log('CPMKNYA ADALAH',this.rekapNilaiCpmk);
      
    }, err => {
      console.log(err);
    });
  }

  lihatNilaiSubCpmkMahasiswa(modalId, id_detailmk_fk ) {
    this.titleModal = 'List SUB CPMK ' + this.nama_mahasiswa ;
    this.id_detailmk_fk = id_detailmk_fk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }

  getGrade(nilai: number): string {
    if (nilai >= 80 && nilai <= 100) {
        return 'A';
    } else if (nilai >= 75 && nilai < 80) {
        return 'B+';
    } else if (nilai >= 70 && nilai < 75) {
        return 'B';
    } else if (nilai >= 65 && nilai < 70) {
        return 'C+';
    } else if (nilai >= 56 && nilai < 65) {
        return 'C';
    } else if (nilai >= 45 && nilai < 56) {
        return 'D';
    } else {
        return 'E'; 
    }
  }
}
