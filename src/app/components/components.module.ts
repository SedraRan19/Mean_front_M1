import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-flexy-module';
import { MenuComponent } from './menu/menu.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from './services/services.component';
import { EmployerComponent } from './employer/employer.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { TasksComponent } from './tasks/tasks.component';
import { InscriptionClientComponent } from './inscription-client/inscription-client.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { AppointmentSetupComponent } from './dashboard-client/dashboard-client-components/appointment-setup/appointment-setup.component';
import { AppointmentHistoryComponent } from './dashboard-client/dashboard-client-components/appointment-history/appointment-history.component';
import { PreferenceManagementComponent } from './dashboard-client/dashboard-client-components/preference-management/preference-management.component';
import { OnlinePaymentComponent } from './dashboard-client/dashboard-client-components/online-payment/online-payment.component';
import { ClientsComponent } from './clients/clients.component';
import { LoginEmployeeManagerComponent } from './login-employee-manager/login-employee-manager.component';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { ReservationEmployeeComponent } from './reservation-employee/reservation-employee.component';
import { SpecialOfferComponent } from './special-offer/special-offer.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { DepenseComponent } from './depense/depense.component';

@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    MenuComponent,
    ExpansionComponent,
    FormsModule,
    ServicesComponent,
    EmployerComponent,
    ClientsComponent,
    ReservationsComponent,
    TasksComponent,
    ReservationEmployeeComponent,
    ProfileEmployeeComponent,
    DashboardClientComponent,
  ],
  exports: [
    MenuComponent,
    ExpansionComponent,
    ServicesComponent,
    EmployerComponent,
    ClientsComponent,
    ReservationsComponent,
    TasksComponent,
    ReservationEmployeeComponent,
    ProfileEmployeeComponent
  ],
  declarations: [ 
  
    InscriptionClientComponent, 
    LoginClientComponent,
    AppointmentSetupComponent,
    AppointmentHistoryComponent,
    PreferenceManagementComponent, 
    OnlinePaymentComponent, 
    LoginEmployeeManagerComponent, 
    DashboardEmployeeComponent, 

    InscriptionClientComponent, 
    LoginClientComponent, 
    AppointmentSetupComponent, 
    AppointmentHistoryComponent, 
    PreferenceManagementComponent, 
    OnlinePaymentComponent, 
    LoginEmployeeManagerComponent, 
    SpecialOfferComponent, DepenseComponent, 
  ]
})
export class ComponentsModule { }
