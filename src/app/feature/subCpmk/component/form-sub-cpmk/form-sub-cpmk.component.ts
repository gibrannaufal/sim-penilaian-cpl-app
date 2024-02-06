import { Component, OnInit , ViewChild, Input , Output , EventEmitter, SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { LandaService } from 'src/app/core/services/landa.service';
import { SubCpmkService } from '../../service/sub-cpmk.service';
import { filterService } from 'src/app/core/services/filter.service';

import { DataTableDirective } from 'angular-datatables';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-sub-cpmk',
  templateUrl: './form-sub-cpmk.component.html',
  styleUrls: ['./form-sub-cpmk.component.scss']
})
export class FormSubCpmkComponent implements OnInit {

  @Output() afterSave = new EventEmitter<boolean>();


  id_mk_fk: number;
  id_detailmk_fk: number;
  id_subcpmk:number;
  title: string;
  titleModal:string;
  matakuliah: any = {};
  activeMode: any;
  subCpmkAll: any;
  newThirdDigit = 0;
  totalBobot = 0;


  formModelCreate: {
    id_mk_fk?: number,
    id_detailmk_fk?: number,
    detail_subcpmk: any[],
    delete_subcpmk: any[]
  } = {
    detail_subcpmk: [],
    delete_subcpmk: []
  };
  

  constructor(
    private route: ActivatedRoute,
    private subCpmkService: SubCpmkService,
    private filterService:filterService,
    private landaService: LandaService,
    private modalService: NgbModal,
    private router: Router
    ) { }


  ngOnInit() {
    // Menerima data dari parameter rute
    this.route.queryParams.subscribe(params => {
       this.id_mk_fk = params['id_mk_fk'];
        this.id_detailmk_fk = params['id_detailmk_fk'];
        this.title = params['title'];
    });
    this.getMkById();
    this.getSubCpmkAll();

  }

 
  getSubCpmkAll()
  {   
    const params = {
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk
    }
    this.filterService.getSubCpmkAll(params).subscribe((res: any) => {
      this.subCpmkAll = res;
      console.log('subCpmk nya adalah ',  this.subCpmkAll);

      this.formModelCreate.id_mk_fk = this.id_mk_fk;
      this.formModelCreate.id_detailmk_fk = this.id_detailmk_fk;

      this.formModelCreate.detail_subcpmk = this.subCpmkAll.map(subCpmk => ({
        id_subcpmk: subCpmk.id_subcpmk,
        nama_subcpmk: subCpmk.nama_subcpmk,
        kode_subcpmk: subCpmk.kode_subcpmk,
        indikator_pencapaian: subCpmk.indikator_pencapaian,
        diskusi_kelompok: subCpmk.diskusi_kelompok,
        simulasi: subCpmk.simulasi,
        studi_kasus: subCpmk.studi_kasus,
        kaloboratif: subCpmk.kaloboratif,
        kooperatif: subCpmk.kooperatif,
        berbasis_proyek: subCpmk.berbasis_proyek,
        berbasis_masalah: subCpmk.berbasis_masalah,
        partisipasi: subCpmk.partisipasi,
        tugas: subCpmk.tugas,
        presentasi: subCpmk.presentasi,
        tes_tulis: subCpmk.tes_tulis,
        tes_lisan: subCpmk.tes_lisan,
        tugas_kelompok: subCpmk.tugas_kelompok,
        instrumen_penilaian: subCpmk.instrumen_penilaian,
        pertemuan: subCpmk.pertemuan,
       
      }));
      this.calculateTotal();   
    }, err => {
      console.log(err);
    });
  }

  changeDetail(mk_detail) {
   this.calculateTotal();
  }
  
  calculateTotal()
  {
    this.totalBobot = this.formModelCreate.detail_subcpmk.reduce(
      (total, detail) => 
      total + +detail.partisipasi + +detail.tugas + +detail.presentasi 
      + +detail.tes_tulis + +detail.tes_lisan  + +detail.tugas_kelompok 
      , 0
      );  
  }

  save() {
    this.formModelCreate.id_mk_fk = this.id_mk_fk;
    this.formModelCreate.id_detailmk_fk = this.id_detailmk_fk;
    for(let i=0; i<this.formModelCreate.detail_subcpmk.length; i++) {
      if(this.formModelCreate.detail_subcpmk[i].nama_subcpmk == '' || this.formModelCreate.detail_subcpmk[i].nama_subcpmk == null )
      {
        this.formModelCreate.detail_subcpmk.splice(i, 1);
        i--;
      }
    }
    
    this.subCpmkService.createSubCpmk(this.formModelCreate).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.router.navigate(['/sub-cpmk']);
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  getMkById()
  {   
    const params = {
      id_mk_fk: this.id_mk_fk,
      id_detailmk_fk: this.id_detailmk_fk
    }

    this.filterService.getMkById(params).subscribe((res: any) => {
      this.matakuliah = res[0];
      // console.log('mk nya  ADALAH',this.matakuliah);
      
    }, err => {
      console.log(err);
    });
  }

  addDetail() {

     // split the digit kode cpmk
    const [prefix, firstDigit, secondDigit] = this.matakuliah.kode_cpmk.split('-');

    // Increment the third digit
    if (this.subCpmkAll.length > 0) {
      const lastSubCpmk = this.subCpmkAll[this.subCpmkAll.length - 1];
      const [prefix, firstDigit, secondDigit, thirdDigit] = lastSubCpmk.kode_subcpmk.split('-'); 
      if(this.newThirdDigit >= parseInt(thirdDigit) ){
        this.newThirdDigit++;
      }else{
        this.newThirdDigit = parseInt(thirdDigit) + 1; 
      }
    }else {
      this.newThirdDigit++;
    }

    // Format the new kode_subcpmk value
    const newKodeSubcpmk = `SUBCPMK-${firstDigit}-${secondDigit}-${this.newThirdDigit.toString().padStart(2, '0')}`;
     
    let val = {
      id_subcpmk: 0,
      nama_subcpmk: '',
      kode_subcpmk: `${newKodeSubcpmk}`,
      indikator_pencapaian: ``,
      diskusi_kelompok: 0,
      simulasi: 0,
      studi_kasus: 0,
      kaloboratif: 0,
      kooperatif: 0,
      berbasis_proyek: 0,
      berbasis_masalah: 0,
      partisipasi: 0,
      tugas: 0,
      presentasi: 0,
      tes_tulis: 0,
      tes_lisan: 0,
      tugas_kelompok: 0,
      instrumen_penilaian: '',
      pertemuan: '',
    };
  
    this.formModelCreate.detail_subcpmk.push(val);
  }

  removeDetail(subCpmk, paramIndex) {
    // Splice the element first
    const removedElement = subCpmk.splice(paramIndex, 1)[0];

    // Use the original index (paramIndex) to push the removed element to delete_subcpmk
    if (removedElement && removedElement.id_subcpmk) {
      this.formModelCreate.delete_subcpmk = this.formModelCreate.delete_subcpmk || [];
      this.formModelCreate.delete_subcpmk.push(removedElement);
      // console.log(this.formModelCreate.delete_subcpmk);
    }
    
     // Ensure newThirdDigit doesn't go below 0
     if (this.newThirdDigit > 0) {
      this.newThirdDigit--;
    } 
  }

  lihatSubCpmk(modalId, nama_cpmk) {
    this.titleModal = 'List SUB CPMK ' + nama_cpmk ;
    this.modalService.open(modalId,{ size: 'lg', backdrop: 'static' });
    this.afterSave.emit();
  }




}
