import { Component, OnInit , ViewChild, Input , Output , EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { SubCpmkService } from 'src/app/feature/subCpmk/service/sub-cpmk.service';
import { ValidasiPenilaianMkService } from '../../service/validasi-penilaian-mk.service';

import { DataTableDirective } from 'angular-datatables';

import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-sub-cpmk-val-penilaian',
  templateUrl: './list-sub-cpmk-val-penilaian.component.html',
  styleUrls: ['./list-sub-cpmk-val-penilaian.component.scss']
})
export class ListSubCpmkValPenilaianComponent implements OnInit {
  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number; 
  @Input() uid: number; 

  @Output() afterSave = new EventEmitter<boolean>();


  istmk: [];
  titleModal: string;
  modelId: number;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      id_mk_fk: number,
      id_detailmk_fk: number,
    };
  
  id_matakuliah: number;
  id_subcpmk: number;
  titleForm: string;
  showForm: boolean;
  listSubcpmk : any;
  
  constructor(
      private subCpmkService: SubCpmkService,
      private validasiPenilaianMkService: ValidasiPenilaianMkService,
      private landaService: LandaService,
      private modalService: NgbModal,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk : this.id_detailmk_fk
    
    };
    this.getmk();
    
  }


  getmk() {
      this.dtOptions = {
          serverSide: true,
          processing: true,
          ordering: false,
          pageLength: 4,
          ajax: (dtParams: any, callback) => {
            const params = {
              id_mk_fk: this.filter.id_mk_fk,
              id_detailmk_fk: this.filter.id_detailmk_fk,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            this.subCpmkService.getSubCpmk(params).subscribe((res: any) => {
              const { list, meta } = res.data;
       
              let number = dtParams.start + 1;
              list.forEach(val => {
                val.no = number++;
              });
              this.listSubcpmk  = list;
       
              callback({
                recordsTotal: meta.total,
                recordsFiltered: meta.total,
                data: [],
              });
       
            }, (err: any) => {
              console.log(err);
            });
          },
        };
  }
  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }

   lihatNilai(modalId, id_subcpmk ,nama_subcpmk ) {
    this.titleModal = 'List Nilai Mahasiswa' + nama_subcpmk ;
    console.log('id_subcpmknya ',id_subcpmk);
    
    this.id_subcpmk = id_subcpmk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }

  diterimaNilai(id_subcpmk ) {
    const param = { 
      id_subcpmk: id_subcpmk,
      id_mk_fk: this.filter.id_mk_fk,
      id_detailmk_fk: this.filter.id_detailmk_fk, 
      };

    Swal.fire({
        title: 'Apakah Anda yakin ?',
        text: 'Men-validasi nilai sub-cpmk ini ',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#34c38f',
        cancelButtonColor: '#f46a6a',
        confirmButtonText: 'Ya, validasi nilai ini !',
    }).then((result) => {
        if (result.value) {
            this.validasiPenilaianMkService.diterimaPenilaian(param).subscribe((res: any) => {
                this.landaService.alertSuccess('Berhasil', res.message);
                window.location.reload();
            }, err => {
                console.log(err);
            });
        }
    });
  }

  ditolakNilai(modalId, id_subcpmk ,nama_subcpmk ) {
    this.titleModal = 'Beri Pesan Penolakaan ' + nama_subcpmk ;
    console.log('id_subcpmknya ',id_subcpmk);
    
    this.id_subcpmk = id_subcpmk;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }


}
