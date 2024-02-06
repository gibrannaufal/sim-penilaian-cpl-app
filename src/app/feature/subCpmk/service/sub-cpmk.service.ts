import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class SubCpmkService {

  constructor(private landaService: LandaService) { }

  getSubCpmk(arrParameter) {
    return this.landaService.DataGet('/v1/subCpmk', arrParameter );
  }
  
  createSubCpmk(payload) {
    return this.landaService.DataPost('/v1/subCpmk', payload);
  }

  getSubCpmkId(id) {
    return this.landaService.DataGet('/v1/subCpmk/' + id);
  }

  updateSubCpmk(payload) {
    return this.landaService.DataPut('/v1/subCpmk', payload);
  }

  deleteSubCpmk(id) {
    return this.landaService.DataDelete('/v1/subCpmk/' + id);
  }


}
