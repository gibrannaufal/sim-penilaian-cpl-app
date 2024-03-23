import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { filterService } from 'src/app/core/services/filter.service';
import { PenilaianMkService } from '../../service/penilaian-mk.service';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  @Input() id_matakuliah: number;
  @Input() uid: number;

  @Output() afterSave = new EventEmitter<boolean>();

  
  detailMk: any;
  subCpmk: any;
  penilaianDetail: any;
  titleModal: string;
  id_mk_fk:number;
  id_detailmk_fk:number;
  closeModal:any;

  constructor(
    private filterService:filterService,
    private modalService: NgbModal,
    private penilaianMkService: PenilaianMkService,
    
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
      
    }, err => {
      console.log(err);
    });
  }

  lihatSubCpmk(modalId, id_mk_fk , id_detailmk_fk ,nama_cpmk ) {
    this.titleModal = 'List SUB CPMK ' + nama_cpmk ;
    this.id_mk_fk = id_mk_fk;
    this.id_detailmk_fk = id_detailmk_fk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }

  selesaiPenilaian(id_mk_fk, id_detailmk_fk ) {

    Swal.fire({
        title: 'Apakah Anda yakin ?',
        text: 'Menyelesaikan penilaian cpmk  ini ',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Ya, selesaikan mata kuliah ini !',
    }).then((result) => {
      if(result.value)
      {
        const param = {
          id_mk_fk: id_mk_fk,
          id_detailmk_fk: id_detailmk_fk
        }
        
        this.filterService.getSubCpmkAll(param).subscribe((res: any) => {
          this.subCpmk = res;

          let isBelumNilai = false; // Memberikan nilai default

          if (this.subCpmk.length === 0) {
            isBelumNilai = true;
          } else {
            isBelumNilai = this.subCpmk.some(item => item.available === 0);
          }

          console.log(this.subCpmk);

          if (isBelumNilai) {
            Swal.fire({
              title: 'Tidak bisa melakukan penilaian',
              text: 'Anda tidak dapat melanjutkan penilaian karena masih ada subcpmk belum dinilai',
              icon: 'warning'
            });
          } else {
              this.penilaianMkService.penilaianDetail(param).subscribe((res: any) => {
                this.penilaianDetail = res;
                console.log('total nilaianya adalah',this.penilaianDetail);
                Swal.fire({
                  title: 'Berhasil!',
                  text: 'Penilaian berhasil.',
                  icon: 'success'
                });
                window.location.reload();

              }, err => {
                console.log(err);
              });
          }

        }, err => {
          console.log(err);
        });
      }
    });
  }
}
