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
    cpl_deleted: any
  }

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
  }

  removeDetail(cpl, paramIndex) {
    console.log("log cpl nya sebelum splice:", cpl[paramIndex]?.id_cpl);

    // Splice the element first
    const removedElement = cpl.splice(paramIndex, 1)[0];

    // Use the original index (paramIndex) to push the removed element to cpl_deleted
    if (removedElement && removedElement.id_cpl) {
      this.formModel.cpl_deleted = this.formModel.cpl_deleted || [];
      this.formModel.cpl_deleted.push(removedElement);
    }
  }

  changeDetail(cpl) {
    if (cpl?.id) {
      cpl.is_updated = true;
    }
  }
}
