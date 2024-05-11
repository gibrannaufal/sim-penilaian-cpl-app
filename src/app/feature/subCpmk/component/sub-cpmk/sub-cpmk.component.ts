import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { MataKuliahService } from 'src/app/feature/mataKuliah/service/mata-kuliah.service';
import { SubCpmkService } from '../../service/sub-cpmk.service';
import { DataTableDirective } from 'angular-datatables';

import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-sub-cpmk',
  templateUrl: './sub-cpmk.component.html',
  styleUrls: ['./sub-cpmk.component.scss']
})
export class SubCpmkComponent implements OnInit {
  listmk: [];
  titleModal: string;
  modelId: number;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;

  filter: {
      nama_mk: ''
    };
  
  titleForm: string;
  id_matakuliah: number;
  showForm: boolean;
  
  constructor(
      private mataKuliahService: MataKuliahService,
      private subCpmkService: SubCpmkService,
      private landaService: LandaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.showForm = false;
    this.filter = {
      nama_mk: '',
    
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
              nama_mk: this.filter.nama_mk,
              itemperpage: 4,
              per_page: dtParams.length,
              page: (dtParams.start / dtParams.length) + 1,
            };
            
            this.subCpmkService.getMkSubCpmk(params).subscribe((res: any) => {
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

  lihatDetail(modalId, id_matakuliah , nama_matakuliah ) {
    this.titleModal = 'List CPMK Mata Kuliah ' + nama_matakuliah ;
    this.id_matakuliah = id_matakuliah,
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
  }

  trackByIndex(index, list): any {
    return list.id;
  }


  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
   }
}
