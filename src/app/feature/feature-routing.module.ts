import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUserComponent } from './user/components/list-user/list-user.component';
import { KurikulumComponent } from './kurikulum/component/kurikulum/kurikulum.component';
import { CpmkComponent } from './cpmk/component/cpmk/cpmk.component';
import { MataKuliahComponent } from './mataKuliah/component/mata-kuliah/mata-kuliah.component';
import { SubCpmkComponent } from './subCpmk/component/sub-cpmk/sub-cpmk.component';
import { FormSubCpmkComponent } from './subCpmk/component/form-sub-cpmk/form-sub-cpmk.component';
import { ValidasiMkComponent } from './validasiMatakuliah/component/validasi-mk/validasi-mk.component';
import { PenilaianMkComponent } from './penilaianMatakuliah/component/penilaian-mk/penilaian-mk.component';
import { FormPenilaianComponent } from './penilaianMatakuliah/component/form-penilaian/form-penilaian.component';
import { ValidasiPenilaianMkComponent } from './validasiPenilaianMk/component/validasi-penilaian-mk/validasi-penilaian-mk.component';
import { EvaluasiCplComponent } from './evaluasiCpl/component/evaluasi-cpl/evaluasi-cpl.component';
import { ValidasiKurikulumComponent } from './validasiKurikulum/component/validasi-kurikulum/validasi-kurikulum.component';
import { RekapNilaiByKapordiComponent } from './rekapNilai/kaprodi/component/rekap-nilai-by-kapordi/rekap-nilai-by-kapordi.component';
import { RekapNilaiMahasiswaComponent } from './rekapNilai/mahasiswa/component/rekap-nilai-mahasiswa/rekap-nilai-mahasiswa.component';
import { EvaluasiCplMahasiswaComponent } from './evaluasiCpl/component/evaluasi-cpl-mahasiswa/evaluasi-cpl-mahasiswa.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent ,pathMatch: 'full'},
    { path: 'user', component: ListUserComponent ,pathMatch: 'full'},
    { path: 'kurikulum', component: KurikulumComponent, pathMatch: 'full' },
    { path: 'cpmk', component: CpmkComponent, pathMatch: 'full' },
    { path: 'mata-kuliah', component: MataKuliahComponent, pathMatch: 'full' },
    { path: 'sub-cpmk', component: SubCpmkComponent, pathMatch: 'full' },
    { path: 'form-sub-cpmk', component: FormSubCpmkComponent, pathMatch: 'full' },
    { path: 'validasi-mk', component: ValidasiMkComponent, pathMatch: 'full' },
    { path: 'penilaian-mk', component: PenilaianMkComponent, pathMatch: 'full' },
    { path: 'form-penilaian', component: FormPenilaianComponent, pathMatch: 'full' },
    { path: 'validasi-penilaian', component: ValidasiPenilaianMkComponent, pathMatch: 'full' },
    { path: 'evaluasi-cpl', component: EvaluasiCplComponent, pathMatch: 'full' },
    { path: 'evaluasi-cpl-mahasiswa', component: EvaluasiCplMahasiswaComponent, pathMatch: 'full' },
    { path: 'validasi-kurikulum', component: ValidasiKurikulumComponent, pathMatch: 'full' },
    { path: 'rekap-nilai-all-mahasiswa', component: RekapNilaiByKapordiComponent, pathMatch: 'full' },
    { path: 'rekap-nilai-mahasiswa', component: RekapNilaiMahasiswaComponent, pathMatch: 'full' },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }
