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

  getKurikulum(productId) {

    this.kurikulumService.getKurikulumId(productId).subscribe((res: any) => {
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
    this.kurikulumService.createKurikulum(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.kurikulumService.updateKurikulum(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  addDetail() {
    let val = {
      is_added: true,
      kode_cpl: '',
      deskripsi_cpl: '',
    }
    this.formModel.cpl.push(val);
  }

  removeDetail(details, paramIndex) {
    details.splice(paramIndex, 1);
    if (details[paramIndex]?.id) {
      this.formModel.cpl.push(details[paramIndex]);
    }
  }

  changeDetail(details) {
    if (details?.id) {
      details.is_updated = true;
    }
  }
}
