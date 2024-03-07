import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluasiCplService {

  constructor(private landaService: LandaService) { }

  getMahasiswa(arrParameter) {
    return this.landaService.DataGet('/v1/evaluasiCpl', arrParameter);
  }

  getRekap(arrParameter) {
    return this.landaService.DataGet('/v1/evaluasiCpl/rekap', arrParameter);
  }

}
