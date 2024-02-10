import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ValidasiMkService } from '../../service/validasi-mk.service';


@Component({
  selector: 'app-list-detail-mk',
  templateUrl: './list-detail-mk.component.html',
  styleUrls: ['./list-detail-mk.component.scss']
})
export class ListDetailMkComponent implements OnInit{
  @Input() id_matakuliah: number; 

  @Output() afterSave = new EventEmitter<boolean>();

  detailMk: any;
  titleModal: string;
  id_mk_fk:number;
  id_detailmk:number;
  closeModal:any;

  constructor(
    private validasiMkService: ValidasiMkService,
    private landaService: LandaService,
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

  diterimaDetailMk(mkId,id_detailmk ) {
    const param = { 
      id_mk_fk: mkId,
       id_detailmk: id_detailmk  
      };

    Swal.fire({
        title: 'Apakah Anda yakin ?',
        text: 'Men-validasi mata Detail Mk ini dan juga SUB-CPMK nya ',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Ya, validasi Detail ini !',
    }).then((result) => {
        if (result.value) {
            this.validasiMkService.diterimaDetail(param).subscribe((res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                window.location.reload();
            }, err => {
                console.log(err);
            });
        }
    });
  }

  ditolak(modalId, id_matakuliah , id_detailmk ) {
    this.id_matakuliah = id_matakuliah,
    this.id_detailmk = id_detailmk,
    this.afterSave.emit(),
    this.modalService.open(modalId,{ size: 'sm', backdrop: 'static' });
  }


  lihatSubCpmk(modalId, id_mk_fk , id_detailmk ,nama_cpmk ) {
    this.titleModal = 'List SUB CPMK ' + nama_cpmk ;
    this.id_mk_fk = id_mk_fk;
    this.id_detailmk = id_detailmk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }
  
}
