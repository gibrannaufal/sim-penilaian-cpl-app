import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

import { CpmkService } from '../../service/cpmk.service';
import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';

@Component({
  selector: 'app-form-cpmk',
  templateUrl: './form-cpmk.component.html',
  styleUrls: ['./form-cpmk.component.scss']
})
export class FormCpmkComponent implements OnInit {
  
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() cpmkId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  selectedKurikulum: any;
  selectedCpl: any;
  
  kurikulum: any;
  id_kurikulum: number;
  cpl:any;
  kode_Kurikulum: string;
  kode_cpl: string;
  showLoading: boolean;

  formModelUpdate: {
    id_cpmk: number,
    id_kurikulum_fk: number,
    kode_kurikulum:string
    id_cpl_fk: number,
    kode_cpl: string,
    kode_cpmk:string,
    deskripsi_cpmk: string
  }

  formModel: {
    id_cpmk: number,
    id_kurikulum_fk: number,
    id_cpl_fk: number,
    detail_cpmk: any,
    delete_cpmk: any
  }

  constructor(
    private CpmkService: CpmkService,
    private filterService:filterService,
    private landaService: LandaService,
  ) { }

  ngOnInit(): void { 
    this.getKurikulum();
    // if(this.formModelUpdate.id_kurikulum_fk !== 0 || this.formModelUpdate.id_kurikulum_fk !== null)
    // {
    //   this.getCpl(this.formModelUpdate.id_kurikulum_fk);
    // }
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }


  getKurikulum()
  {   
    this.filterService.getKurikulumFilter().subscribe((res: any) => {
      this.kurikulum = res;
      
    }, err => {
      console.log(err);
    });
  }
  onKurikulumChange(selectedValue: any) {
    this.formModel.id_kurikulum_fk = selectedValue.id_kurikulum;
    this.kode_Kurikulum =  selectedValue.kode_kurikulum;
    this.getCpl(selectedValue.id_kurikulum);
  }

  getCpl(idKurikulum: number)
  {
    this.filterService.getCplFilter(idKurikulum).subscribe((res: any) => {
      this.cpl = res;
    }, err => {
      console.log(err);
    });
  }

  onCplChange(selectedValue: any) {
    this.formModel.id_cpl_fk = selectedValue.id_cpl;
    this.kode_cpl =  selectedValue.kode_cpl;
  }


  resetForm() {
    this.formModel = {
      id_cpmk: 0,
      id_kurikulum_fk: 0,
      id_cpl_fk: 0,
      detail_cpmk: [],
      delete_cpmk: []
    }

    if (this.cpmkId > 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getCpmk(this.cpmkId);
      
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

  getCpmk(cpmkId) {

    this.CpmkService.getCpmkId(cpmkId).subscribe((res: any) => {
      this.formModelUpdate = {
        id_cpmk: res.data.id_cpmk,
        id_kurikulum_fk: res.data.detail_kurikulum.id_kurikulum,
        kode_kurikulum: res.data.detail_kurikulum.kode_kurikulum,
        id_cpl_fk: res.data.detail_cpl.id_cpl,
        kode_cpl: res.data.detail_cpl.kode_cpl,
        kode_cpmk: res.data.kode_cpmk,
        deskripsi_cpmk: res.data.deskripsi_cpmk
      }
      this.getCpl(res.data.detail_kurikulum.id_kurikulum);
      console.log(this.formModelUpdate);

    }, err => {
      console.log(err);
    });
  }

  insert() {
    for(let i=0; i<this.formModel.detail_cpmk.length; i++) {
      if(this.formModel.detail_cpmk[i].deskripsi_cpmk == '' || this.formModel.detail_cpmk[i].deskripsi_cpmk == null )
      {
        this.formModel.detail_cpmk.splice(i, 1);
        i--;
      }
    }
    
    this.CpmkService.createCpmk(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.CpmkService.updateKurikulum(this.formModelUpdate).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  addDetail() {
    console.log(this.kode_cpl);
    
    const matchResult = this.kode_cpl.match(/\d+/); // Mencocokkan angka dalam kode_cpl
    const nextIndexCpl = matchResult ? parseInt(matchResult[0], 10): 1;

    // Mengambil dua digit dari angka
    const paddedIndexCpl = nextIndexCpl.toString().padStart(2, '0');

    const nextIndex = this.formModel.detail_cpmk.length + 1;
    const paddedIndex = nextIndex.toString().padStart(2, '0');

    let val = {
      is_added: true,
      kode_cpmk: `CPMK-${paddedIndexCpl}-${paddedIndex}`,
      deskripsi_cpmk: '',
    };

    this.formModel.detail_cpmk.push(val);
  }

  removeDetail(cpl, paramIndex) {
    // console.log("log cpl nya sebelum splice:", cpl[paramIndex]?.id_cpmk);

    // Splice the element first
    const removedElement = cpl.splice(paramIndex, 1)[0];

    // Use the original index (paramIndex) to push the removed element to cpl_deleted
    if (removedElement && removedElement.id_cpmk) {
      this.formModel.delete_cpmk = this.formModel.delete_cpmk || [];
      this.formModel.delete_cpmk.push(removedElement);
    }
  }

  changeDetail(cpl) {
    if (cpl?.id) {
      cpl.is_updated = true;
    }
  }

  
}
