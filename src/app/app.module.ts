/**Application Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';

/**Application Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './userRegistrationComponents/login-component/login-component.component';
import { RegisterComponent } from './userRegistrationComponents/register-component/register-component.component';
import { ForgetComponent } from './userRegistrationComponents/forget-component/forget-component.component';
import { RegistrationLayoutComponent } from './pageLayouts/registration-layout-component/registration-layout-component.component';
import { ResetPasswordComponent } from './userRegistrationComponents/reset-password/reset-password.component';
import { LogOutComponent } from './userRegistrationComponents/log-out/log-out.component';
import { MainLayoutComponent } from './pageLayouts/main-layout-component/main-layout-component.component';
import { PatientRequestComponent } from './navigationComponents/patient-request/patient-request.component';
import { RequestByStatusComponent } from './navigationComponents/request-by-status/request-by-status.component';
import { PatientMedicalComponent } from './navigationComponents/patient-medical/patient-medical.component';
import { MedicinesComponent } from './navigationComponents/medicines/medicines.component';
import { MedicineDetailsComponent } from './medicinecomponents/medicine-details.component';
import { ErrorComponent } from './commonComponets/error/error.component';
import { RedirectComponent } from './commonComponets/redirect/redirect.component';

/**Applicaiton Pipes */
import { PageLimitPipe } from './pipes/page-limit.pipe';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { OrderbyPipe } from './pipes/orderby.pipe';

/**Application Routes */
import { RouteModule } from './routes/medicalTracker.routes';

/**Application Directives */
import { EmailvalidatorDirective } from './directives/emailvalidator.directive';
import { CompareValidatorDirective } from './directives/compare-validator.directive';

/**Application Services */
import { AccountService } from './Services/account.service';
import { CommonService } from './Services/common.service';
import { NavigationService } from './Services/navigation.service';
import { GaurdService } from './Services/gaurd.service';
import { PatientRequestCanDeactiveGaurdService } from './Services/patient-request-can-deactive-gaurd.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
    LogOutComponent,
    ResetPasswordComponent,
    RegistrationLayoutComponent,
    MainLayoutComponent,
    PatientRequestComponent,
    RequestByStatusComponent,
    PatientMedicalComponent,
    MedicinesComponent,
    MedicineDetailsComponent,
    ErrorComponent,
    RedirectComponent,
    PageLimitPipe,
    SearchFilterPipe,
    TitleCasePipe,
    OrderbyPipe,
    EmailvalidatorDirective,
    CompareValidatorDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouteModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    AccountService,
    CommonService,
    NavigationService,
    GaurdService,
    PatientRequestCanDeactiveGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
