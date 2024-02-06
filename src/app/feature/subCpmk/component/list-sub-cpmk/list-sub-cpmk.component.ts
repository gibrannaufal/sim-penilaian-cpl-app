import { Component, OnInit , ViewChild, Input , Output , EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LandaService } from 'src/app/core/services/landa.service';
import Swal from 'sweetalert2';
import { SubCpmkService } from '../../service/sub-cpmk.service';
import { DataTableDirective } from 'angular-datatables';

import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list-sub-cpmk',
  templateUrl: './list-sub-cpmk.component.html',
  styleUrls: ['./list-sub-cpmk.component.scss']
})
export class ListSubCpmkComponent implements OnInit {
  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number; 

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
  
  titleForm: string;
  id_matakuliah: number;
  showForm: boolean;
  listSubcpmk : any;
  
  constructor(
      private subCpmkService: SubCpmkService,
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

  formCreate() {
  
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id_mk_fk: this.id_mk_fk,
        id_detailmk_fk: this.id_detailmk_fk,
        title: this.titleForm,
      }
    };
  
    this.router.navigate(['/form-sub-cpmk'], navigationExtras);
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

}
