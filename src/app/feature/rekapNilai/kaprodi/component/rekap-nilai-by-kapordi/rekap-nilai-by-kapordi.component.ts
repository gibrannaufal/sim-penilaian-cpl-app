import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';

import { RekapNilaiByKaprodiServiceService } from '../../service/rekap-nilai-by-kaprodi-service.service';

import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
import { MataKuliahService } from 'src/app/feature/mataKuliah/service/mata-kuliah.service';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

@Component({
  selector: 'app-rekap-nilai-by-kapordi',
  templateUrl: './rekap-nilai-by-kapordi.component.html',
  styleUrls: ['./rekap-nilai-by-kapordi.component.scss']
})
export class RekapNilaiByKapordiComponent implements OnInit {
  listmk: [];
  showForm: boolean;
  titleForm: string;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
    nama_mk: ''
    };

  id_mk_fk: number;
  profile: any;
  
  constructor(
      private authService: AuthService,
      private mataKuliahService: MataKuliahService,
      private RekapNilaiByKaprodiServiceService: RekapNilaiByKaprodiServiceService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      nama_mk: '',
    
    };
      this.getmk();
      this.getRoles();
  }

  getRoles() {
    this.authService.getProfile().subscribe((user: any) => {
      this.profile = user;
      console.log(this.profile);
      
      
    });
  }

  trackByIndex(index, list): any {
    return list.id;
  }

  getmk() {
      this.dtOptions = {
          serverSide: true,
          processing: true,
          ordering: false,
          pageLength: 4,
          ajax: (dtParams: any, callback) => {
            const params = {
              nama_mk: this.filter.nama_mk,
              nip: this.profile.nip,
              roles_name: this.profile.roles_name,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            this.RekapNilaiByKaprodiServiceService.getMatkulRekap(params).subscribe((res: any) => {
              const { list, meta } = res.data;
      
              let number = dtParams.start + 1;
              list.forEach(val => {
                val.no = number++;
              });
              this.listmk  = list;
      
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

   formRekap(id_mk_fk) {
    this.showForm = true;
    this.titleForm = 'List Rekap Nilai Mahasiswa ';
    this.id_mk_fk = id_mk_fk;
  }
}
