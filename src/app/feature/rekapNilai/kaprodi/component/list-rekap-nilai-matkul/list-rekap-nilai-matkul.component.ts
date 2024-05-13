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
  @Input() id_mk_fk: number;
  @Output() afterSave = new EventEmitter<boolean>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  
  listRekap: [];
  filter: {
    nama_mahasiswa: ''
  };

  titleModal: string;
  id_detailmk_fk: number;
  nrp: number;
  listMahasiswa: any;
  nama_mahasiswa:string;
  
  
  constructor(
      private rekapNilaiByKaprodiServiceService: RekapNilaiByKaprodiServiceService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.filter = {
      nama_mahasiswa: '',
    
    };
      this.getmahasiswa();
  }

    getmahasiswa() {
      this.dtOptions = {
          serverSide: true,
          processing: true,
          ordering: false,
          pageLength: 4,
          ajax: (dtParams: any, callback) => {
            const params = {
              nama_mahasiswa: this.filter.nama_mahasiswa,
              id_mk_fk: this.id_mk_fk,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            this.rekapNilaiByKaprodiServiceService.getMahasiswa(params).subscribe((res: any) => {
              const { list, meta } = res.data;
       
              let number = dtParams.start + 1;
              list.forEach(val => {
                val.no = number++;
              });
              this.listMahasiswa  = list;
       
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
  trackByIndex(index, list): any {
    return list.id;
  }

  lihatNilaiCpmkMahasiswa(modalId  , nrp , nama_mahasiswa  ) {
    this.titleModal = 'List CPMK ' + nama_mahasiswa ;
    this.nama_mahasiswa = nama_mahasiswa;
    this.nrp = nrp;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
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
