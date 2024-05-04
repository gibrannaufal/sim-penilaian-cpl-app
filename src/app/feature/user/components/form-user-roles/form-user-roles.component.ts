import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-user-roles',
  templateUrl: './form-user-roles.component.html',
  styleUrls: ['./form-user-roles.component.scss']
})
export class FormUserRolesComponent implements OnInit {
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() rolesId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  formModel: {
    id: number,
    name: string,
  }

  listRoles: any;

  constructor(
    private userService: UserService,
    private landaService: LandaService
  ) { }

  ngOnInit(): void {
    // this.getRoles();
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  resetForm() {
    this.formModel = {
      id: 0,
      name: ''
    }

    if (this.rolesId > 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getRoles(this.rolesId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  getRoles(rolesId) {
    console.log('roles id nya ini' , rolesId);
    
    this.userService.getRolesById(rolesId).subscribe((res: any) => {
      this.formModel = res.data;
    }, err => {
      console.log(err);
    });
  }

  save() {
    switch (this.activeMode) {
      case this.MODE_CREATE:
        this.insert();
        break;
      case this.MODE_UPDATE:
        this.update();
        break;
    }
  }

  insert() {
    this.userService.createRoles(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.userService.updateRoles(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }
}
