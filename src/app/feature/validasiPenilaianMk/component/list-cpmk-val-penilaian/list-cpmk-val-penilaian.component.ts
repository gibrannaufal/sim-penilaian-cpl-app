import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'app-list-cpmk-val-penilaian',
  templateUrl: './list-cpmk-val-penilaian.component.html',
  styleUrls: ['./list-cpmk-val-penilaian.component.scss']
})
export class ListCpmkValPenilaianComponent implements OnInit {
  @Input() id_matakuliah: number;
  @Input() uid: number;

  @Output() afterSave = new EventEmitter<boolean>();

  
  detailMk: any;
  titleModal: string;
  id_mk_fk:number;
  id_detailmk_fk:number;
  closeModal:any;

  constructor(
    private filterService:filterService,
    private modalService: NgbModal,
    
  ) { }

  ngOnInit(): void { 
    this.getDetailMk()
    
  }

  getDetailMk()
  {   
    const params = {
      id_matakuliah: this.id_matakuliah,
    }
    this.filterService.getDetailMk(params).subscribe((res: any) => {
      this.detailMk = res;
      console.log('CPMKNYA ADALAH',this.detailMk);
      
    }, err => {
      console.log(err);
    });
  }

  lihatSubCpmk(modalId, id_mk_fk , id_detailmk_fk ,nama_cpmk ) {
    this.titleModal = 'List SUB-CPMK ' + nama_cpmk ;
    this.id_mk_fk = id_mk_fk;
    this.id_detailmk_fk = id_detailmk_fk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }

  lihatNilaiCpmk(modalId, id_mk_fk , id_detailmk_fk ,nama_cpmk ) {
    this.titleModal = 'List Nilai CPMK ' + nama_cpmk ;
    this.id_mk_fk = id_mk_fk;
    this.id_detailmk_fk = id_detailmk_fk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }


}
