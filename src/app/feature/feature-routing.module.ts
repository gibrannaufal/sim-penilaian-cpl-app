import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { KurikulumComponent } from './kurikulum/component/kurikulum/kurikulum.component';
import { CpmkComponent } from './cpmk/component/cpmk/cpmk.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent ,pathMatch: 'full'},
    { path: 'user', component: ListUserComponent ,pathMatch: 'full'},
    { path: 'kurikulum', component: KurikulumComponent, pathMatch: 'full' },
    { path: 'cpmk', component: CpmkComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
