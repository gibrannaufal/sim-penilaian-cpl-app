import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';


@Injectable({
  providedIn: 'root'
})
export class ValidasiKurikulumService {

  constructor(private landaService: LandaService) { }

  diterimaKurikulum(payload) {
    return this.landaService.DataPut('/v1/validasiKurikulum/diterima', payload);
  }
  ditolakKurikulum(payload) {
    return this.landaService.DataPut('/v1/validasiKurikulum/ditolak', payload);
  }

}
