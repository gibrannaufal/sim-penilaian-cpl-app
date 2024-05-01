import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class RekapNilaiByKaprodiServiceService {

  constructor(private landaService: LandaService) { }

  getMahasiswa(arrParameter) {
    return this.landaService.DataGet('/v1/rekapNilai', arrParameter);
  }

  getRekap(arrParameter) {
    return this.landaService.DataGet('/v1/rekapNilai/rekap', arrParameter);
  }
}
