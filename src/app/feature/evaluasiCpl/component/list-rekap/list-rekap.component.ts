import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { EvaluasiCplService } from '../../service/evaluasi-cpl.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-rekap',
  templateUrl: './list-rekap.component.html',
  styleUrls: ['./list-rekap.component.scss']
})
export class ListRekapComponent implements OnInit {

  listRekap: [];
  filter: {
      nrp: ''
    };
  
  @Input() nrp: number;
  @Output() afterSave = new EventEmitter<boolean>();
  
  constructor(
      private evaluasiCplService: EvaluasiCplService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.filter = {
      nrp: '',
    
    };
      this.getRekap();
  }
  getRekap()
  {   
    const params = {
      nrp: this.nrp,
    }
    this.evaluasiCplService.getRekap(params).subscribe((res: any) => {
      this.listRekap = res;
      console.log('rekapnya adalah ',this.listRekap);
      
    }, err => {
      console.log(err);
    });
  }
  
}
