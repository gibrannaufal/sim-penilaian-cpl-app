import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})
export class ValidasiPenilaianMkService {

  constructor(private landaService: LandaService) { }

  diterimaPenilaian(payload) {
    return this.landaService.DataPost('/v1/subCpmk/penilaian/diterima', payload);
  }
  ditolakPenilaian(payload) {
    return this.landaService.DataPost('/v1/subCpmk/penilaian/ditolak', payload);
  }

}
