import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';

import { ValidasiMkService } from 'src/app/feature/validasiMatakuliah/service/validasi-mk.service';

import { ValidasiKurikulumService } from '../../service/validasi-kurikulum.service';

@Component({
  selector: 'app-form-validasi-kurikulum',
  templateUrl: './form-validasi-kurikulum.component.html',
  styleUrls: ['./form-validasi-kurikulum.component.scss']
})
export class FormValidasiKurikulumComponent implements OnInit{
  @Input() id_kurikulum_fk: number;


  @Output() afterSave = new EventEmitter<boolean>();


  ngOnInit(): void { 
   
   
  }

  
  pesan : string;

  constructor(
    private ValidasiKurikulumService: ValidasiKurikulumService,
    private landaService: LandaService,
    private modalService: NgbModal,
  ) { }

  save()
  {
    var params  = {
      pesan: this.pesan,
      id_kurikulum_fk: this.id_kurikulum_fk
    }
    this.ValidasiKurikulumService.ditolakKurikulum(params).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
      
      }, err => {
        this.landaService.alertError('Mohon Maaf', err.error.errors);
      });

  }



}
