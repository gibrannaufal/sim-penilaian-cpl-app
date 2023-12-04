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

}
