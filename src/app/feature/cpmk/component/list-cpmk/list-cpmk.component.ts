import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';

import { CpmkService } from '../../service/cpmk.service';
import { filterService } from 'src/app/core/services/filter.service';
import { LandaService } from 'src/app/core/services/landa.service';
@Component({
  selector: 'app-list-cpmk',
  templateUrl: './list-cpmk.component.html',
  styleUrls: ['./list-cpmk.component.scss']
})
export class ListCpmkComponent implements OnInit {
  @Input() id_kurikulum: number;
  @Input() id_cpl: number;

  cpmkAll: any;

  constructor(
    private filterService:filterService
  ) { }

  ngOnInit(): void { 
    this.getCpmkAll();
  }

  getCpmkAll()
  {   
    const params = {
      id_kurikulum: this.id_kurikulum,
      id_cpl: this.id_cpl
    }
    this.filterService.getCpmkFilterAll(params).subscribe((res: any) => {
      this.cpmkAll = res;
      console.log('CPMKNYA ADALAH',this.cpmkAll);
      
    }, err => {
      console.log(err);
    });
  }

}
