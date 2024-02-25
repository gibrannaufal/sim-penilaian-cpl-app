import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class PenilaianMkService {

  constructor(private landaService: LandaService) { }

  getMk(arrParameter) {
    return this.landaService.DataGet('/v1/getMatkul', arrParameter);
  }

  getKelas(arrParameter) {
    return this.landaService.DataGet('/v1/penilaianMk', arrParameter);
  }

  savePenilaian(payload) {
    return this.landaService.DataPost('/v1/penilaianMk', payload);
  }

  submitNilai(payload)
  {
    return this.landaService.DataPost('/v1/subCpmk/submit', payload);
  }

    
}
