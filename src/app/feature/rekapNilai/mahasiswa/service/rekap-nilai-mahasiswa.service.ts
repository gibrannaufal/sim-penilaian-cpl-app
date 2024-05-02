import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
  providedIn: 'root'
})

export class RekapNilaiMahasiswaService {

  constructor(private landaService: LandaService) { }

  getRekapMahasiswa(arrParameter) {
    return this.landaService.DataGet('/v1/rekapNilai/mahasiswa', arrParameter);
  }
  
}
