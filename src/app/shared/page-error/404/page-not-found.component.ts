import { Component, OnInit } from '@angular/core';

import { DOCUMENT, Location } from "@angular/common";
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  back(){
    this._location.back();
  }

}
