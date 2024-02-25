import { Component, OnInit , ViewChild, Input , Output , EventEmitter, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { filterService } from 'src/app/core/services/filter.service';


import { DataTableDirective } from 'angular-datatables';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-nilai-mahasiswa',
  templateUrl: './list-nilai-mahasiswa.component.html',
  styleUrls: ['./list-nilai-mahasiswa.component.scss']
})
export class ListNilaiMahasiswaComponent implements OnInit {
  @Output() afterSave = new EventEmitter<boolean>();

  @Input() id_mk_fk: number;
  @Input() id_detailmk_fk: number; 
  @Input() uid: number; 
  @Input() id_subcpmk: number;

  // id_mk_fk: number;
  // id_detailmk_fk: number;
  // uid: number;
  // id_subcpmk:number;
  title: string;
  subCpmk: any = {};
  formModel: any[] = []; 
  listMahasiswaApi: any[] = []; 
  listMahasiswaDb: any[] = []; 
  listSubcpmk: any;



  constructor(
    private route: ActivatedRoute,
    private filterService:filterService,
    ) { }


  ngOnInit() {
    // Menerima data dari parameter rute
    this.getDetailMk();
    this.getListMahasiswa();

  }

  getDetailMk()
  {   
    const params = {
      id_subcpmk: this.id_subcpmk,
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk,
    }
    console.log('params nya', params);
    
    this.filterService.getSubCpmkById(params).subscribe((res: any) => {
      this.subCpmk = res;
      console.log('listSubcpmknya ADALAH',this.subCpmk);
      
    }, err => {
      console.log(err);
    });
  }

  getListMahasiswa()
  {
    const params = {
      uid:  this.uid,
      id_subcpmk_fk: this.id_subcpmk,
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk
    }
    this.filterService.getListMahasiswa(params).subscribe((res: any) => {
      this.formModel = res;
      console.log('list mahasiswa nya ',this.formModel);
      
    }, err => {
      console.log(err);
    });

  }

}
