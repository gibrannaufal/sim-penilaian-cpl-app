import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { RekapNilaiByKaprodiServiceService } from '../../service/rekap-nilai-by-kaprodi-service.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-rekap-nilai-matkul',
  templateUrl: './list-rekap-nilai-matkul.component.html',
  styleUrls: ['./list-rekap-nilai-matkul.component.scss']
})
export class ListRekapNilaiMatkulComponent implements OnInit {
  @Input() nrp: number;
  @Output() afterSave = new EventEmitter<boolean>();

  listRekap: [];
  filter: {
      nrp: ''
    };
  titleModal: string;
  id_detailmk_fk: number;
  id_mk_fk: number;
  
  
  constructor(
      private rekapNilaiByKaprodiServiceService: RekapNilaiByKaprodiServiceService,
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
    this.rekapNilaiByKaprodiServiceService.getRekap(params).subscribe((res: any) => {
      this.listRekap = res.data;
      console.log('rekapnya adalah ',this.listRekap);
      
    }, err => {
      console.log(err);
    });
  }

  lihatNilaiCpmkMahasiswa(modalId, id_mk_fk , id_detailmk_fk , nrp , nama_mk ) {
    this.titleModal = 'List CPMK ' + nama_mk ;
    this.id_mk_fk = id_mk_fk;
    this.id_detailmk_fk = id_detailmk_fk;
    this.nrp = nrp;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }
}
