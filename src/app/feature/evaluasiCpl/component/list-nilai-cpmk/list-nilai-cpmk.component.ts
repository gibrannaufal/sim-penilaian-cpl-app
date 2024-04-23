import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { EvaluasiCplService } from '../../service/evaluasi-cpl.service';
import { filterService } from 'src/app/core/services/filter.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-list-nilai-cpmk',
  templateUrl: './list-nilai-cpmk.component.html',
  styleUrls: ['./list-nilai-cpmk.component.scss']
})
export class ListNilaiCpmkComponent implements OnInit {
  
  @Input() nrp: number;
  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number;
  @Output() afterSave = new EventEmitter<boolean>();

  rekapNilaiCpmk: [];
  
  titleModal: any;
  
  constructor(
      private evaluasiCplService: EvaluasiCplService,
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

  lihatNilaiSubCpmkMahasiswa(modalId, nama_mk ) {
    this.titleModal = 'List SUB CPMK ' + nama_mk ;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }


}
