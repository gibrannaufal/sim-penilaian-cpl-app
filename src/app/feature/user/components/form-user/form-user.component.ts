import { Component, Input, OnInit, Output, EventEmitter, SimpleChange } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  readonly MODE_CREATE = 'add';
  readonly MODE_UPDATE = 'update';

  @Input() userId: number;
  @Output() afterSave = new EventEmitter<boolean>();

  activeMode: string;
  formModel: {
    id: number,
    name: string,
    email: string,
    password: string,
    nrp: number,
    nip: number,
    alamat: string,
    jenis_kelamin: string,
    prodi: string,
    user_roles_id: number,
  }

  listRoles: any;

  constructor(
    private userService: UserService,
    private landaService: LandaService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnChanges(changes: SimpleChange) {
    this.resetForm();
  }

  resetForm() {
    this.formModel = {
      id: 0,
      name: '',
      email: '',
      password: '',
      nrp: 0,
      nip: 0,
      user_roles_id: 0,
      alamat: '',
      prodi: '',
      jenis_kelamin: 'laki-laki',
    }

    if (this.userId > 0) {
      this.activeMode = this.MODE_UPDATE;
      this.getUser(this.userId);
      return true;
    }

    this.activeMode = this.MODE_CREATE;
  }

  getUser(userId) {
    this.userService.getUserById(userId).subscribe((res: any) => {
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
    this.userService.createUser(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  update() {
    this.userService.updateUser(this.formModel).subscribe((res: any) => {
      this.landaService.alertSuccess('Berhasil', res.message);
      this.afterSave.emit();
    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

  getRoles()
  {
    this.userService.getRoles().subscribe((res: any) => {
      this.listRoles = res
      console.log(this.listRoles);

    }, err => {
      this.landaService.alertError('Mohon Maaf', err.error.errors);
    });
  }

}
