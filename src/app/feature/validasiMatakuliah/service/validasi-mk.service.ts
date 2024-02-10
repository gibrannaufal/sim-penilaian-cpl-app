import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';


@Injectable({
  providedIn: 'root'
})
export class ValidasiMkService {

  constructor(private landaService: LandaService) { }

  diterimaMk(payload) {
    return this.landaService.DataPut('/v1/validasiMk/diterima', payload);
  }
  ditolakMk(payload) {
    return this.landaService.DataPut('/v1/validasiMk/ditolak', payload);
  }

  diterimaDetail(payload) {
    return this.landaService.DataPut('/v1/validasiMk/diterimaDetail', payload);
  }

  ditolakDetail(payload) {
    return this.landaService.DataPut('/v1/validasiMk/ditolakDetail', payload);
  }

}
