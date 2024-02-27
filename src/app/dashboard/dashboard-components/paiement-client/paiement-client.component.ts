import { Component } from '@angular/core';
import { AppointmentSetupService } from 'src/app/components/dashboard-client/dashboard-client-components/appointment-setup/appointment-setup.service';

@Component({
  selector: 'app-paiement-client',
  templateUrl: './paiement-client.component.html',
  styleUrls: ['./paiement-client.component.scss']
})
export class PaiementClientComponent {
  appointments: any[] = [];
  dataTables: any[] = [];

  constructor(private appointmentSetupService: AppointmentSetupService) {
  }

  ngOnInit() {
    this.loadAppointment();
  }

  loadAppointment() {
    this.appointmentSetupService.getFullAppointment().subscribe(
      (appointments) => {
        this.appointments = appointments;
        appointments.forEach((appointment: any) => {
          if (appointment.status == "Confirmed") {
            let montant_total = 0;
            appointment.requestedServices.forEach((element: any) => {
              montant_total += element.serviceId.price;
            });
            const dataTable = {
              date: appointment.appointmentDate,
              nom: appointment.clientId.lastName + ' ' + appointment.clientId.firstName,
              status: 'Payé',
              montant: montant_total
            }
            this.dataTables.push(dataTable);
          }
        });
        console.log(appointments);
        console.log(this.dataTables);
      }
    )
  };


}
