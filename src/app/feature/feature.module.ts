import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { FeatureRoutingModule } from './feature-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModule } from './user/user.module';

import { KurikulumModule } from './kurikulum/Kurikulum.module';
import { CpmkModule } from './cpmk/Cpmk.module';
import { mataKuliahModule } from './mataKuliah/mataKuliah.module';
import { subCpmkModule } from './subCpmk/subCpmk.module';
import { ValidasiMkModule } from './validasiMatakuliah/ValidasiMk.module';
import { PenilaianMkModule } from './penilaianMatakuliah/PenilaianMk.module';
import { ValidasiPenilaianMkModule } from './validasiPenilaianMk/ValidasiPenilaianMk.module';
import { evaluasiCplModule } from './evaluasiCpl/evaluasiCpl.module';
import { ValidasiKurikulumModule } from './validasiKurikulum/ValidasiKurikulum.module';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//     suppressScrollX: true,
//     wheelSpeed: 0.3
// };

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        ReactiveFormsModule,
        NgbAlertModule,
        CommonModule,
        FeatureRoutingModule,
        // PerfectScrollbarModule,
        UserModule,
        KurikulumModule,
        CpmkModule,
        mataKuliahModule,
        subCpmkModule,
        ValidasiMkModule,
        PenilaianMkModule,
        ValidasiPenilaianMkModule,
        evaluasiCplModule,
        ValidasiKurikulumModule
    ],
    // providers: [
    //     {
    //         provide: PERFECT_SCROLLBAR_CONFIG,
    //         useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    //     }
    // ]
})
export class FeatureModule { }
