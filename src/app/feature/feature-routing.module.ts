import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { KurikulumComponent } from './kurikulum/component/kurikulum/kurikulum.component';
import { CpmkComponent } from './cpmk/component/cpmk/cpmk.component';
import { MataKuliahComponent } from './mataKuliah/component/mata-kuliah/mata-kuliah.component';
import { SubCpmkComponent } from './subCpmk/component/sub-cpmk/sub-cpmk.component';
import { FormSubCpmkComponent } from './subCpmk/component/form-sub-cpmk/form-sub-cpmk.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent ,pathMatch: 'full'},
    { path: 'user', component: ListUserComponent ,pathMatch: 'full'},
    { path: 'kurikulum', component: KurikulumComponent, pathMatch: 'full' },
    { path: 'cpmk', component: CpmkComponent, pathMatch: 'full' },
    { path: 'mata-kuliah', component: MataKuliahComponent, pathMatch: 'full' },
    { path: 'sub-cpmk', component: SubCpmkComponent, pathMatch: 'full' },
    { path: 'form-sub-cpmk', component: FormSubCpmkComponent, pathMatch: 'full' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
