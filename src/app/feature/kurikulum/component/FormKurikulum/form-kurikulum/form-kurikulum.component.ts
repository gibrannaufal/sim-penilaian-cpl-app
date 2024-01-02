import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

import { KurikulumService } from '../../../service/kurikulum.service';
import { LandaService } from 'src/app/core/services/landa.service';


@Component({
  selector: 'app-form-kurikulum',
  templateUrl: './form-kurikulum.component.html',
  styleUrls: ['./form-kurikulum.component.scss']
})
export class FormKurikulumComponent {
  readonly DEFAULT_STATUS = 'Ganjil';
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() kurikulumId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;

  showLoading: boolean;
  formModel: {
    id: number,
    kode_kurikulum: string,
    nama_kurikulum: string,
    periode: string,
    tahun: string,
    profil_lulusan: string,
    cpl: any, 
    status: string,
    cpl_deleted: any
  }
  isFormValid: boolean = false;

  constructor(
    private kurikulumService: KurikulumService,
    private landaService: LandaService,
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  onTahunChange() {
    const lastTwoDigits = ('' + this.formModel.tahun).slice(-2);
    this.formModel.kode_kurikulum = `SI1${lastTwoDigits}`;
  }

  getKurikulum(kurikulumId) {

    this.kurikulumService.getKurikulumId(kurikulumId).subscribe((res: any) => {
      this.formModel = res.data;
      this.validateForm();
      console.log(this.formModel.cpl);
      
    }, err => {
      console.log(err);
    });

  }

  resetForm() {
    this.formModel = {
      id: 0,
      kode_kurikulum: '',
      nama_kurikulum: '',
      periode: '',
      tahun: '',
      profil_lulusan: '',
      status: '',
      cpl: [],
      cpl_deleted: []
    }

    if (this.kurikulumId > 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getKurikulum(this.kurikulumId);
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
    for(let i=0; i<this.formModel.cpl.length; i++) {
      if(this.formModel.cpl[i].deskripsi_cpl == '' || this.formModel.cpl[i].deskripsi_cpl == null )
      {
        this.formModel.cpl.splice(i, 1);
        i--;
      }
    }
    this.formModel.status = this.activeMode;
    this.kurikulumService.createKurikulum(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    for(let i=0; i<this.formModel.cpl.length; i++) {
      if(this.formModel.cpl[i].deskripsi_cpl == '' || this.formModel.cpl[i].deskripsi_cpl == null )
      {
        this.formModel.cpl.splice(i, 1);
        i--;
      }
    }
    this.formModel.status = this.activeMode;
    this.kurikulumService.updateKurikulum(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  addDetail() {
    const nextIndex = this.formModel.cpl.length + 1;
    const paddedIndex = nextIndex.toString().padStart(3, '0');

    let val = {
      is_added: true,
      kode_cpl: `CPL-${paddedIndex}`,
      deskripsi_cpl: '',
    };

    this.formModel.cpl.push(val);

    if (val.deskripsi_cpl.trim() !== '') {
      this.isFormValid = true;
    } else {
      // If deskripsi_cpl is empty, set isFormValid to false
      this.isFormValid = false;
    }
    
  }

  removeDetail(cpl, paramIndex) {
    // Splice the element first
    const removedElement = cpl.splice(paramIndex, 1)[0];

    // Use the original index (paramIndex) to push the removed element to cpl_deleted
    if (removedElement && removedElement.id_cpl) {
      this.formModel.cpl_deleted = this.formModel.cpl_deleted || [];
      this.formModel.cpl_deleted.push(removedElement);
    }
    this.isFormValid = true;

  }

  changeDetail(cpl) {
    this.validateForm();
    if (cpl?.id) {
      cpl.is_updated = true;
    }
  }
  onKeyPress(event: any) {
    // Mendapatkan karakter yang dimasukkan
    const charCode = (event.which) ? event.which : event.keyCode;

    // Memastikan bahwa hanya karakter angka yang diperbolehkan
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
  }

  validateForm() {
    // Reset isFormValid menjadi true
    this.isFormValid = true;
  
    // Validasi input dan setel isFormValid menjadi false jika ada input yang kosong
    this.formModel.cpl.forEach(detail => {
      if (!detail.deskripsi_cpl) {
        this.isFormValid = false;
      } 
    });
  }

}
