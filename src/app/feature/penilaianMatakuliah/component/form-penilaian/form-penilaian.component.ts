import { Component, OnInit , ViewChild, Input , Output , EventEmitter, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { LandaService } from 'src/app/core/services/landa.service';
import { PenilaianMkService } from '../../service/penilaian-mk.service';
import { filterService } from 'src/app/core/services/filter.service';


import { DataTableDirective } from 'angular-datatables';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-penilaian',
  templateUrl: './form-penilaian.component.html',
  styleUrls: ['./form-penilaian.component.scss']
})
export class FormPenilaianComponent implements OnInit {
  @Output() afterSave = new EventEmitter<boolean>();

  id_mk_fk: number;
  id_detailmk_fk: number;
  uid: number;
  id_subcpmk:number;
  title: string;
  subCpmk: any = {};
  formModel: any[] = []; 
  listMahasiswaApi: any[] = []; 
  listMahasiswaDb: any[] = []; 
  listSubcpmk: any;



  constructor(
    private route: ActivatedRoute,
    private filterService:filterService,
    private landaService: LandaService,
    private modalService: NgbModal,
    private penilaianMkService: PenilaianMkService,
    private router: Router
    ) { }


  ngOnInit() {
    // Menerima data dari parameter rute
    this.route.queryParams.subscribe(params => {
       this.id_mk_fk = params['id_mk_fk'];
        this.id_detailmk_fk = params['id_detailmk_fk'];
        this.id_subcpmk = params['id_subcpmk_mk'];
        this.title = params['title'];
    });
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
      id_subcpmk_fk: this.id_subcpmk,
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk
    }
    this.filterService.getMahasiswaDummy(params).subscribe((res: any) => {
      this.formModel = res;
      console.log('list mahasiswa nya ',this.formModel);
      
    }, err => {
      console.log(err);
    });

  }

  changeDetail(mahasiswa) {
    var partisipasi = parseInt(mahasiswa.partisipasi);
    var tugas = parseInt(mahasiswa.tugas);
    var presentasi = parseInt(mahasiswa.presentasi);
    var tes_tulis = parseInt(mahasiswa.tes_tulis);
    var tes_lisan = parseInt(mahasiswa.tes_lisan);
    var tugas_kelompok = parseInt(mahasiswa.tugas_kelompok);

    // rumus nya 
    // 80*5%+75*5%+90*10%= 16.75

    if(partisipasi != null && partisipasi != 0 )
    {
      partisipasi  = (partisipasi * this.subCpmk.partisipasi) /100;
      
    }  if(tugas != null && tugas != 0 )
    {
      tugas  = (tugas * this.subCpmk.tugas) /100;
      
    }  if(presentasi != null && presentasi != 0 )
    {
      presentasi  = (presentasi * this.subCpmk.presentasi) /100;
      
    }  if(tes_tulis != null && tes_tulis != 0 )
    {
      tes_tulis  = (tes_tulis * this.subCpmk.tes_tulis) /100;
      
    }  if(tes_lisan != null && tes_lisan != 0 )
    {
      tes_lisan  = (tes_lisan * this.subCpmk.tes_lisan) /100;
      
    }  if(tugas_kelompok != null && tugas_kelompok != 0 )
    {
      tugas_kelompok  = (tugas_kelompok * this.subCpmk.tugas_kelompok) /100;
      
    } 
    
    mahasiswa.total_nilai = partisipasi + tugas + presentasi + tes_tulis + tes_lisan + tugas_kelompok;

    console.log(mahasiswa);
    
  }

  save() {
    const params = {
      penilaian: this.formModel,
    }
    // console.log('list form modelnya adalah',params);
    
    this.penilaianMkService.savePenilaian(params).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      // this.router.navigate(['/sub-cpmk']);
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }
  
  keluar()
  {
      this.router.navigate(['/penilaian-mk']);
  }

  submit() {
    Swal.fire({
      title: 'Apakah kamu yakin ?',
      text: 'Setelah mensubmit nilai ini tidak bisa dirubah',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Submit nilai ini !',
  }).then((result) => {
      if (result.value) {
        const param = {
          penilaian: this.formModel,
        }
        this.penilaianMkService.savePenilaian(param).subscribe((res: any) => {
      
        }, err => {
          this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
        

        const params = {
          available: 1,
          id_subcpmk: this.id_subcpmk,
          id_mk_fk: this.id_mk_fk,
          id_detailmk_fk: this.id_detailmk_fk
        }
        
        this.penilaianMkService.submitNilai(params).subscribe((res: any) => {
          this.landaService.alertSuccess('Berhasil', res.message);
          window.location.reload();
        }, err => {
          this.landaService.alertError('Mohon Maaf', err.error.errors);
        });
      }
  });
   
  }
}
