import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { filterService } from 'src/app/core/services/filter.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-rekap-nilai-sub-cpmk',
  templateUrl: './list-rekap-nilai-sub-cpmk.component.html',
  styleUrls: ['./list-rekap-nilai-sub-cpmk.component.scss']
})
export class ListRekapNilaiSubCpmkComponent implements OnInit{
  rekapNilaiCpmk: [];
  
  @Input() nrp: number;
  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number;
  @Output() afterSave = new EventEmitter<boolean>();
  
  constructor(
      private filterService: filterService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
      this.getRekapNilaiSubCpmk();
  }

  getRekapNilaiSubCpmk()
  {   
    const params = {
      nrp: this.nrp,
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk,
    }
    console.log(params);
    
    this.filterService.getPenilaianAll(params).subscribe((res: any) => {
      this.rekapNilaiCpmk = res;
      console.log('CPMKNYA ADALAH',this.rekapNilaiCpmk);
      
    }, err => {
      console.log(err);
    });
  }
}
