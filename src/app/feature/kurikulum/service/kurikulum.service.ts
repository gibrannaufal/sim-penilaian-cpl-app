import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class KurikulumService {

  constructor(private landaService: LandaService) { }

    getKurikulum(arrParameter) {
        return this.landaService.DataGet('/v1/kurikulum', arrParameter );
    }

    getKurikulumId(id) {
      return this.landaService.DataGet('/v1/kurikulum/' + id);
    }

    createKurikulum(payload) {
      return this.landaService.DataPost('/v1/kurikulum', payload);
    }
  
    updateKurikulum(payload) {
      return this.landaService.DataPut('/v1/kurikulum', payload);
    }

    deleteKurikulum(id) {
      return this.landaService.DataDelete('/v1/kurikulum/' + id);
    }

    
  
}
