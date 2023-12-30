import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class MataKuliahService {

  constructor(private landaService: LandaService) { }

  getmk(arrParameter) {
    return this.landaService.DataGet('/v1/mataKuliah', arrParameter);
  }

  getMkId(id) {
    return this.landaService.DataGet('/v1/mataKuliah/' + id);
  }

  createMk(payload) {
    return this.landaService.DataPost('/v1/mataKuliah', payload);
  }

  updateMk(payload) {
    return this.landaService.DataPut('/v1/mataKuliah', payload);
  }

  deleteMk(id) {
    return this.landaService.DataDelete('/v1/mataKuliah/' + id);
  }
}
