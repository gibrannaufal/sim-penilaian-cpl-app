import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class CpmkService {

  constructor(private landaService: LandaService) { }

  getCpmk(arrParameter) {
    return this.landaService.DataGet('/v1/cpmk', arrParameter );
  }
  
  createCpmk(payload) {
    return this.landaService.DataPost('/v1/cpmk', payload);
  }

  getCpmkId(id) {
    return this.landaService.DataGet('/v1/cpmk/' + id);
  }

  updateCpmk(payload) {
    return this.landaService.DataPut('/v1/cpmk', payload);
  }

  deleteCpmk(id) {
    return this.landaService.DataDelete('/v1/cpmk/' + id);
  }


}
