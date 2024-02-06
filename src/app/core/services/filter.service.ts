import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class filterService {

  constructor(private landaService: LandaService) { }

  getKurikulumFilter() {
    return this.landaService.DataGet('/v1/kurikulumFilter' );
  }
  getCplFilter(id) {
    return this.landaService.DataGet('/v1/cplFilter/'+ id );
  }
  getCpmkFilter(id) {
    return this.landaService.DataGet('/v1/cpmkFilter/'+ id );
  }
  getCpmkFilterAll(arrParameter) {
    return this.landaService.DataGet('/v1/cpmkFilterAll/', arrParameter );
  }
  getDetailMk(arrParameter)
  {
    return this.landaService.DataGet('/v1/detailMk/', arrParameter );
  }

  getMkById(arrParameter)
  {
    return this.landaService.DataGet('/v1/mkById/', arrParameter );
  }

  getSubCpmkAll(arrParameter)
  {
    return this.landaService.DataGet('/v1/subCpmkAll/', arrParameter );
  }
  
}
