import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { ClientFilterPipe } from './components/clients/client.filter.pipe';
import { EmployeeFilterPipe } from './components/employer/employer.filter.pipe';
import { ReservationFilterPipe } from './components/reservations/reservations.filter.pipe';
import { ReservationEmployeeFilterPipe } from './components/reservation-employee/reservation-employee.filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ClientFilterPipe,
    EmployeeFilterPipe,
    ReservationFilterPipe,
    ReservationEmployeeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
  ],
  providers: [
    ClientFilterPipe,
    EmployeeFilterPipe,
    ReservationFilterPipe,
    ReservationEmployeeFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
