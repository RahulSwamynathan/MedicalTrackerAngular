import { RouterModule, Routes } from '@angular/router';

import { RegistrationLayoutComponent } from '../pageLayouts/registration-layout-component/registration-layout-component.component';
import { MainLayoutComponent } from '../pageLayouts/main-layout-component/main-layout-component.component';
import { LoginComponent } from '../userRegistrationComponents/login-component/login-component.component';
import { RegisterComponent } from '../userRegistrationComponents/register-component/register-component.component';
import { ForgetComponent } from '../userRegistrationComponents/forget-component/forget-component.component';
import { ResetPasswordComponent } from '../userRegistrationComponents/reset-password/reset-password.component';
import { PatientRequestComponent } from '../navigationComponents/patient-request/patient-request.component';
import { RequestByStatusComponent } from '../navigationComponents/request-by-status/request-by-status.component';
import { PatientMedicalComponent } from '../navigationComponents/patient-medical/patient-medical.component';
import { MedicinesComponent } from '../navigationComponents/medicines/medicines.component';
import { LogOutComponent } from '../userRegistrationComponents/log-out/log-out.component';
import { MedicineDetailsComponent } from '../medicinecomponents/medicine-details.component';
import { ErrorComponent } from '../commonComponets/error/error.component';
import { RedirectComponent } from '../commonComponets/redirect/redirect.component';

import { GaurdService } from '../Services/gaurd.service';
import { PatientRequestCanDeactiveGaurdService } from '../Services/patient-request-can-deactive-gaurd.service';


const LoginRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/reset', component: ResetPasswordComponent },
    { path: 'login/reset/forget', component: ForgetComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component:ErrorComponent }
];

const MainRoutes: Routes = [
    { path: 'request', component: PatientRequestComponent, canActivate: [GaurdService], canDeactivate:[PatientRequestCanDeactiveGaurdService] },
    { path: 'request/:patientId', component: PatientRequestComponent, canActivate: [GaurdService], canDeactivate:[PatientRequestCanDeactiveGaurdService] },
    { path: 'allRequest', component: RequestByStatusComponent, canActivate: [GaurdService] },
    { path: 'requested', component: RequestByStatusComponent, canActivate: [GaurdService] },
    { path: 'approvedRequest', component: RequestByStatusComponent, canActivate: [GaurdService] },
    { path: 'medicineDetails', component: PatientMedicalComponent, canActivate: [GaurdService] },
    { path: 'approvedDoctor', component: RequestByStatusComponent, canActivate: [GaurdService] },
    { path: 'medicine', component:MedicineDetailsComponent, canActivate: [GaurdService] },
    { path: 'allMedicine', component: MedicinesComponent, canActivate: [GaurdService] },
    { path: '', redirectTo: 'request', pathMatch: 'full', canActivate: [GaurdService] },
    { path: '**', pathMatch: 'full', component:ErrorComponent }
];

const routes: Routes = [
    { path: 'Layout', component: RegistrationLayoutComponent, children: LoginRoutes },
    { path: 'requestLayout', component: MainLayoutComponent, children: MainRoutes },
    { path: 'logout', component: LogOutComponent },
    { path: 'redirect', component: RedirectComponent },
    { path: '', redirectTo: '/Layout/login', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', component:ErrorComponent }
];

export const RouteModule = RouterModule.forRoot(routes);