import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoFlexyModule } from '../demo-flexy-module'
import { DashboardComponent } from './dashboard.component';
import { SalesComponent } from './dashboard-components/sales/sales.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { ProductComponent } from './dashboard-components/product/product.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TempMoyenTravailEmployeComponent } from './dashboard-components/temp-moyen-travail-employe/temp-moyen-travail-employe.component';
import { NbReservationComponent } from './dashboard-components/nb-reservation/nb-reservation.component';
import { ChiffreAffaireComponent } from './dashboard-components/chiffre-affaire/chiffre-affaire.component';
import { BeneficeComponent } from './dashboard-components/benefice/benefice.component';
import { PaiementClientComponent } from './dashboard-components/paiement-client/paiement-client.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SalesComponent,
    ActivityComponent,
    ProductComponent,
    CardsComponent,
    TempMoyenTravailEmployeComponent,
    NbReservationComponent,
    ChiffreAffaireComponent,
    BeneficeComponent,
    PaiementClientComponent,
  ],
  imports: [
    CommonModule,
    DemoFlexyModule,
    FormsModule,
    NgApexchartsModule,
    DragDropModule
  ],
  exports: [
    DashboardComponent,
    SalesComponent,
    ActivityComponent,
    ProductComponent,
  ]
})
export class DashboardModule { }
