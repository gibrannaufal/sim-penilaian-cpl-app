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

}
