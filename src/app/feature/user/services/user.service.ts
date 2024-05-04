import { Injectable } from '@angular/core';
import { LandaService } from 'src/app/core/services/landa.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private landaService: LandaService) { }

    // api user
    getUsers(arrParameter) {
        return this.landaService.DataGet('/v1/users', arrParameter);
    }

    getUserById(userId) {
        return this.landaService.DataGet('/v1/users/' + userId);
    }

    createUser(payload) {
        return this.landaService.DataPost('/v1/users', payload);
    }

    updateUser(payload) {
        return this.landaService.DataPut('/v1/users', payload);
    }

    deleteUser(userId) {
        return this.landaService.DataDelete('/v1/users/' + userId);
    }
    getRoles() {
        return this.landaService.DataGet('/v1/getRoles');
    }

    // api roles
    getRolesAll(arrParameter) {
        return this.landaService.DataGet('/v1/roles', arrParameter);
    }

    getRolesById(userId) {
        return this.landaService.DataGet('/v1/roles/' + userId);
    }

    createRoles(payload) {
        return this.landaService.DataPost('/v1/roles', payload);
    }

    updateRoles(payload) {
        return this.landaService.DataPut('/v1/roles', payload);
    }

    deleteRoles(userId) {
        return this.landaService.DataDelete('/v1/roles/' + userId);
    }

}
