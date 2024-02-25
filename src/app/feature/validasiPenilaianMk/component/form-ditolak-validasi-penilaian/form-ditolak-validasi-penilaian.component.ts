import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';

import { ValidasiPenilaianMkService } from '../../service/validasi-penilaian-mk.service';

@Component({
  selector: 'app-form-ditolak-validasi-penilaian',
  templateUrl: './form-ditolak-validasi-penilaian.component.html',
  styleUrls: ['./form-ditolak-validasi-penilaian.component.scss']
})
export class FormDitolakValidasiPenilaianComponent implements OnInit {
  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number;
  @Input() id_subcpmk: number;
  @Input() uid: number;


  @Output() afterSave = new EventEmitter<boolean>();

  readonly MODE_DETAIL = 'detail';
  readonly MODE_MK = 'mk';

  activeMode: string;


  ngOnInit(): void { 
   
  }

  
  pesan : string;

  constructor(
    private validasiPenilaianMkService: ValidasiPenilaianMkService,
    private landaService: LandaService,
    private modalService: NgbModal,
  ) { }

  ditolakDetail(modalId)
  {
    var param  = {
      pesan_penilaian: this.pesan,
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk,
      id_subcpmk: this.id_subcpmk
    }
    this.validasiPenilaianMkService.ditolakPenilaian(param).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);

      this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
      this.afterSave.emit();
      
      }, err => {
        this.landaService.alertError('Mohon Maaf', err.error.errors);
      });
  }



  kembali(modalId) {
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }

}
