import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { RekapNilaiMahasiswaService } from '../../service/rekap-nilai-mahasiswa.service';

import { RekapNilaiByKaprodiServiceService } from '../../../kaprodi/service/rekap-nilai-by-kaprodi-service.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';


@Component({
  selector: 'app-rekap-nilai-mahasiswa',
  templateUrl: './rekap-nilai-mahasiswa.component.html',
  styleUrls: ['./rekap-nilai-mahasiswa.component.scss']
})
export class RekapNilaiMahasiswaComponent implements OnInit {

  // @Output() afterSave = new EventEmitter<boolean>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  nrp: any;
  listRekap: [];
  filter: {
      nrp: '',
      nama_matakuliah: ''
    };
  titleModal: string;
  id_detailmk_fk: number;
  id_mk_fk: number;
  profile: any;
  
  
  constructor(
      private rekapNilaiMahasiswaService : RekapNilaiMahasiswaService,
      private authService: AuthService,
      private rekapNilaiByKaprodiServiceService : RekapNilaiByKaprodiServiceService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.filter = {
      nrp: '',
      nama_matakuliah: '',
    
    };
    this.getRoles();
    this.getRekap();
  }
  getRoles() {
    this.authService.getProfile().subscribe((user: any) => {
      this.profile = user;

      // console.log('profile nya',this.profile);
      
    });
  }

  getRekap() {
    this.dtOptions = {
        serverSide: true,
        processing: true,
        ordering: false,
        pageLength: 4,
        ajax: (dtParams: any, callback) => {
          const params = {
            nrp: this.profile.nrp,
            nama_matakuliah: this.filter.nama_matakuliah,
            itemperpage: 4,
            per_page: dtParams.length,
            page: (dtParams.start / dtParams.length) + 1,
          };
          
          this.rekapNilaiMahasiswaService.getRekapMahasiswa(params).subscribe((res: any) => {
            const { list, meta } = res.data;
     
            let number = dtParams.start + 1;
            list.forEach(val => { 
              val.no = number++;
            });
            this.listRekap  = list;
     
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

   lihatNilaiCpmkMahasiswa(modalId, id_mk_fk , id_detailmk_fk , nrp , nama_mk ) {
    this.titleModal = 'List CPMK ' + nama_mk ;
    console.log('paramsnya ' , modalId, id_mk_fk , id_detailmk_fk , nrp , nama_mk );
    
    this.id_mk_fk = id_mk_fk;
    this.id_detailmk_fk = id_detailmk_fk;
    this.nrp = nrp;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    // this.afterSave.emit();
  }

  getGrade(nilai: number): string {
    if (nilai >= 80 && nilai <= 100) {
        return 'A';
    } else if (nilai >= 75 && nilai < 80) {
        return 'B+';
    } else if (nilai >= 70 && nilai < 75) {
        return 'B';
    } else if (nilai >= 65 && nilai < 70) {
        return 'C+';
    } else if (nilai >= 56 && nilai < 65) {
        return 'C';
    } else if (nilai >= 45 && nilai < 56) {
        return 'D';
    } else {
        return 'E'; 
    }
  }
}
