import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

import { mataKuliahModule } from '../../mataKuliah.module';
import { LandaService } from 'src/app/core/services/landa.service';
import { MataKuliahService } from '../../service/mata-kuliah.service';
import { filterService } from 'src/app/core/services/filter.service';


@Component({
  selector: 'app-form-mata-kuliah',
  templateUrl: './form-mata-kuliah.component.html',
  styleUrls: ['./form-mata-kuliah.component.scss']
})
export class FormMataKuliahComponent {
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() mkId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  selectedKurikulum: any;
  selectedCpl: any;
  selectedCpmk: any;
  selectedMatkulApi:any;

  kurikulum: any;
  matkulApi: any;
  id_kurikulum: number;
  cpl:any;
  cpmk:any;
  kode_Kurikulum: string;
  kode_cpl: string;
  kode_cpmk: string;
  showLoading: boolean;
  totalBobot: number = 0;
  isFormValid: boolean = false;

  formModel: {
    id_matakuliah: number,
    id_kurikulum_fk: number,
    kode_kurikulum:string,
    kode_matakuliah: string,
    nama_matakuliah: string,
    deskripsi: string,
    sks: any, 
    bobot: number,
    semester: string,
    bobot_kajian: string,
    uuid_api: string,
    prodi: string,
    kelas: string,
    mk_detail:any,
    mk_detail_deleted:any,
    status:any
  }

  constructor(
    private mkService: MataKuliahService,
    private filterService: filterService,
    private landaService: LandaService,
  ) { }

  ngOnInit(): void { 
    this.getKurikulum(); 
    this.getMkApi();
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.resetForm();

  }

  getMk(mkId) {
    this.mkService.getMkId(mkId).subscribe((res: any) => {
      this.formModel = res.data;
      // console.log('formModelnya',this.formModel);

      // MEMBUAT FUNCTION SEPERTI ONKURIKULUMCHANGE DAN CPMKCHANGE UNTUK UPDATE
      const details = this.formModel.mk_detail;

      this.filterService.getCpmkFilter(this.formModel.id_kurikulum_fk).subscribe((res: any) => {
        this.cpmk = res;

        this.filterService.getCplFilter(this.formModel.id_kurikulum_fk).subscribe((res: any) => {
          this.cpl = res; 
          console.log(this.cpl);
          
          details.forEach((detail, index) => {
            const cpmkIndex = this.cpmk.findIndex(cpmk => cpmk.id_cpmk === detail.id_cpmk_fk);
            const cplIndex = this.cpl.findIndex(cpmk => cpmk.id_cpl === detail.id_cpl_fk);
            if (cpmkIndex !== -1) {
              detail.kode_cpmk = this.cpmk[cpmkIndex].kode_cpmk;
              detail.kode_cpl = this.cpl[cplIndex].kode_cpl;
              detail.deskripsi_cpl = this.cpl[cplIndex].deskripsi_cpl;
            }
          });

        }, err => {
          console.log(err);
        });

      }, err => {
        console.log(err);
      });
      this.calculateTotalBobot();
      this.validateForm();

    }, err => {
      console.log(err);
    });
  }

  getKurikulum()
  {   
    this.filterService.getKurikulumFilter().subscribe((res: any) => {
      this.kurikulum = res;
      
    }, err => {
      console.log(err);
    });
  }
  

  resetForm() {
    this.formModel = {
      id_matakuliah: 0,
      id_kurikulum_fk: 0,
      kode_kurikulum: '',
      kode_matakuliah: '',
      nama_matakuliah: '',
      deskripsi: '',
      sks: '',
      bobot: 0,
      semester: '',
      bobot_kajian: '',
      uuid_api: '',
      kelas: '',
      prodi: '',
      mk_detail: [],
      mk_detail_deleted: [],
      status: ''
    }

    if (this.mkId > 0) {
      this.activeMode = this.MODE_UPDATE;
    
      this.getMk(this.mkId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
    
  }
  
  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
  }

  insert() {
    for(let i=0; i<this.formModel.mk_detail.length; i++) {
      if(this.formModel.mk_detail[i].bobot_detailmk == '' || this.formModel.mk_detail[i].bobot_detailmk == null )
      {
        this.formModel.mk_detail.splice(i, 1);
        i--;
      }
    }
    // console.log('detailnya', this.formModel.mk_detail);
    
    this.mkService.createMk(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    for(let i=0; i<this.formModel.mk_detail.length; i++) {
      if(this.formModel.mk_detail[i].bobot_detailmk == '' || this.formModel.mk_detail[i].bobot_detailmk == null )
      {
        this.formModel.mk_detail.splice(i, 1);
        i--;
      }
    }
    console.log('ini mk detail deletednya ',this.formModel.mk_detail_deleted);
    
    this.formModel.status = this.activeMode;
    this.mkService.updateMk(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  addDetail() {
    let val = {
      is_added: true,
      id_cpl_fk: '',
      id_cpmk_fk: '',
      indikator_pencapaian: '',
      bobot_detailmk: ''
    };

    this.formModel.mk_detail.push(val);
  }

  removeDetail(mk_detail, paramIndex) {
    // Splice the element first
    const removedElement = mk_detail.splice(paramIndex, 1)[0];

    // Use the original index (paramIndex) to push the removed element to cpl_deleted
    if (removedElement && removedElement.id_detailmk) {
      this.formModel.mk_detail_deleted = this.formModel.mk_detail_deleted || [];
      this.formModel.mk_detail_deleted.push(removedElement);
    }
  }

  changeDetail(mk_detail) {
    this.calculateTotalBobot();
    this.validateForm();
    if (mk_detail?.id) {
      mk_detail.is_updated = true;
    }
  }

  onKurikulumChange(idKurikulum: any) {
    this.selectedKurikulum = this.kurikulum .find(kurikulum => kurikulum.id_kurikulum === idKurikulum);
    this.formModel.kode_kurikulum = this.selectedKurikulum.kode_kurikulum;
    this.getCpmk(idKurikulum);
    this.getCpl(idKurikulum);
  }

  getCpmk(id_kurikulum: number)
  {
    this.filterService.getCpmkFilter(id_kurikulum).subscribe((res: any) => {
      this.cpmk = res;
    }, err => {
      console.log(err);
    });
  }

  getCpl(idKurikulum: number)
  {
    this.filterService.getCplFilter(idKurikulum).subscribe((res: any) => {
      this.cpl = res;
      
    }, err => {
      console.log(err);
    });
  }
  
  onCpmkChange(detail: any) {
    const i = this.formModel.mk_detail.indexOf(detail);
    
    if (i !== -1) {
      const id_cpmk_fk = this.formModel.mk_detail[i].id_cpmk_fk;
      const cpmk_selected = this.cpmk.find(c => c.id_cpmk === id_cpmk_fk);

      this.formModel.mk_detail[i].kode_cpmk = cpmk_selected.kode_cpmk
      this.formModel.mk_detail[i].id_cpl_fk = cpmk_selected.id_cpl_fk

      const cpl_selected = this.cpl.find(c => c.id_cpl === cpmk_selected.id_cpl_fk )

      // console.log('cplnya adalah',cpl_selected);  

      this.formModel.mk_detail[i].kode_cpl = cpl_selected.kode_cpl;
      this.formModel.mk_detail[i].deskripsi_cpl = cpl_selected.deskripsi_cpl;
      

    } else {
      console.error("Indeks tidak valid untuk properti mk_detail:", detail);
    }
  }

  calculateTotalBobot() {
    this.totalBobot = this.formModel.mk_detail.reduce((total, detail) => total + +detail.bobot_detailmk, 0);
    this.formModel.bobot = this.totalBobot;
  }
  validateForm() {
    // Reset isFormValid menjadi true
    this.isFormValid = true;
  
    // Validasi input dan setel isFormValid menjadi false jika ada input yang kosong
    this.formModel.mk_detail.forEach(detail => {
      if ( !detail.indikator_pencapaian || !detail.bobot_detailmk || !detail.id_cpmk_fk) {
        this.isFormValid = false;
      } 
    });
  }
  onKeyPress(event: any) {
    // Mendapatkan karakter yang dimasukkan
    const charCode = (event.which) ? event.which : event.keyCode;

    // Memastikan bahwa hanya karakter angka yang diperbolehkan
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
  }


  getMkApi()
  {   
    const params = {}
    this.filterService.getMkApi(params).subscribe((res: any) => {
      this.matkulApi = res;
      console.log('apinya',this.matkulApi);
      
     
    }, err => {
      console.log(err);
    });
  }


  onChangeMatkul(matkul)
  {
    this.selectedMatkulApi = this.matkulApi.find(apiMatkul => apiMatkul.mata_kuliah === matkul);

    this.formModel.kode_matakuliah = this.selectedMatkulApi.kode;
    this.formModel.semester = this.selectedMatkulApi.semester;
    this.formModel.sks = this.selectedMatkulApi.sks;
    this.formModel.uuid_api = this.selectedMatkulApi.uid;
    this.formModel.kelas = this.selectedMatkulApi.kelas;
    this.formModel.prodi = this.selectedMatkulApi.prodi;
    
  }

}
