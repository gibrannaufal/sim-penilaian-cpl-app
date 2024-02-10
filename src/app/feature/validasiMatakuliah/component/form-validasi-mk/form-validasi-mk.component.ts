import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';

import { ValidasiMkService } from '../../service/validasi-mk.service';


@Component({
  selector: 'app-form-validasi-mk',
  templateUrl: './form-validasi-mk.component.html',
  styleUrls: ['./form-validasi-mk.component.scss']
})
export class FormValidasiMkComponent implements OnInit {
  @Input() id_matakuliah: number;

  @Input() id_detailmk: number;

  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_DETAIL = 'detail';
  readonly MODE_MK = 'mk';

  activeMode: string;


  ngOnInit(): void { 
    if(this.id_detailmk !== undefined)
    {
      this.activeMode = this.MODE_DETAIL;
    }else if(this.id_detailmk === undefined)
    {
      this.activeMode = this.MODE_MK;

    }
    console.log(this.id_detailmk);
   
  }

  
  pesan : string;

  constructor(
    private validasiMkService: ValidasiMkService,
    private landaService: LandaService,
    private modalService: NgbModal,
  ) { }

  save()
  {
    switch (this.activeMode) {
      case this.MODE_DETAIL:
        this.ditolakDetail();
        break;
      case this.MODE_MK:
        this.ditolakMk();
        break;
    }

  }

  ditolakDetail()
  {
    var param  = {
      pesan: this.pesan,
      id_mk_fk: this.id_matakuliah,
      id_detailmk: this.id_detailmk
    }
    this.validasiMkService.ditolakDetail(param).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      
      }, err => {
        this.landaService.alertError('Mohon Maaf', err.error.errors);
      });
  }

  ditolakMk()
  {
    var params  = {
      pesan: this.pesan,
      id_matakuliah: this.id_matakuliah
    }
    this.validasiMkService.ditolakMk(params).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      
      }, err => {
        this.landaService.alertError('Mohon Maaf', err.error.errors);
      });
  }

  kembali(modalId, id_mk_fk) {
    this.id_matakuliah = id_mk_fk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }

}
