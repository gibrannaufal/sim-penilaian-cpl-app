import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';

import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';
import { ValidasiMkService } from 'src/app/feature/validasiMatakuliah/service/validasi-mk.service';

@Component({
  selector: 'app-list-cpl',
  templateUrl: './list-cpl.component.html',
  styleUrls: ['./list-cpl.component.scss']
})
export class ListCplComponent implements OnInit {
  @Input() id_kurikulum_fk: number; 

  @Output() afterSave = new EventEmitter<boolean>();

  detailKurikulum: any;
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
      id_kurikulum_fk: this.id_kurikulum_fk,
    }
    this.filterService.getCplByKurikulum(params).subscribe((res: any) => {
      this.detailKurikulum = res;
      console.log('kurikulumnya adalah',this.detailKurikulum);
      
    }, err => {
      console.log(err);
    });
  }


}
