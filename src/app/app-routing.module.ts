import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { ServicesComponent } from './components/services/services.component';
import { EmployerComponent } from './components/employer/employer.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { InscriptionClientComponent } from './components/inscription-client/inscription-client.component';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { DashboardClientComponent } from './components/dashboard-client/dashboard-client.component';
import { AppointmentHistoryComponent } from './components/dashboard-client/dashboard-client-components/appointment-history/appointment-history.component';
import { AppointmentSetupComponent } from './components/dashboard-client/dashboard-client-components/appointment-setup/appointment-setup.component';
import { OnlinePaymentComponent } from './components/dashboard-client/dashboard-client-components/online-payment/online-payment.component';
import { PreferenceManagementComponent } from './components/dashboard-client/dashboard-client-components/preference-management/preference-management.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginEmployeeManagerComponent } from './components/login-employee-manager/login-employee-manager.component';
import { DashboardEmployeeComponent } from './components/dashboard-employee/dashboard-employee.component';
import { ReservationEmployeeComponent } from './components/reservation-employee/reservation-employee.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { ProfileEmployeeComponent } from './components/profile-employee/profile-employee.component';
import { DepenseComponent } from './components/depense/depense.component';
import { AuthGuard } from 'src/environments/AuthGuard';
import { AuthGuardClient } from 'src/environments/AuthGuardClient';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      // Route manager 
      {path:"", redirectTo:"/dashboard-client", pathMatch:"full"},
      {path:"home", component:DashboardComponent,canActivate:[AuthGuard]},
      {path:"reservations", component:ReservationsComponent,canActivate:[AuthGuard]},
      {path:"services", component:ServicesComponent,canActivate:[AuthGuard]},
      {path:"employers", component:EmployerComponent,canActivate:[AuthGuard]},
      {path:"clients",component:ClientsComponent,canActivate:[AuthGuard]},
      {path:"tasks",component:TasksComponent,canActivate:[AuthGuard]},
      {path:"special-offer", component:SpecialOfferComponent,canActivate:[AuthGuard]},
      {path:"depense",component:DepenseComponent,canActivate:[AuthGuard]},
      {path:"login-employee-manager",component:LoginEmployeeManagerComponent},

      // Route employee
      {path:"dashboard-employee",component:DashboardEmployeeComponent,canActivate:[AuthGuard]},
      {path:"reservation-employee",component:ReservationEmployeeComponent,canActivate:[AuthGuard]},
      {path:"profile-employee",component:ProfileEmployeeComponent,canActivate:[AuthGuard]},

      //Route client
      {path:"inscription-client",component:InscriptionClientComponent},
      {path:"login-client",component:LoginClientComponent},
      {path:"dashboard-client",component:DashboardClientComponent},
      {path:"appointment-history-client",component:AppointmentHistoryComponent,canActivate:[AuthGuardClient]},
      {path:"appointment-setup-client",component:AppointmentSetupComponent,canActivate:[AuthGuardClient]},
      {path:"online-payment-client",component:OnlinePaymentComponent,canActivate:[AuthGuardClient]},
      {path:"preference-management-client",component:PreferenceManagementComponent,canActivate:[AuthGuardClient]},
    ]
  },

  //{path:"", redirectTo:"/home", pathMatch:"full"},
  //{path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
