import { Component } from '@angular/core';
import { AppointmentService } from 'src/app/components/reservations/reservations.service';

@Component({
  selector: 'app-nb-reservation',
  templateUrl: './nb-reservation.component.html',
  styleUrls: ['./nb-reservation.component.scss']
})
export class NbReservationComponent {
  dateJour: any;
  dateMois: any;
  nbReservationParJour: any;
  nbReservationParMois: any;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.dateJour = new Date().toISOString().slice(0, 10);
    this.dateMois = new Date().toISOString().slice(0, 7);
    this.updateReservationParJour();
    this.updateReservationParMois();
  }

  updateReservationParJour() {
    this.appointmentService.getNRPJ(this.dateJour).subscribe(
      (response: any) => {
        this.nbReservationParJour = response;
      }
    );
  }

  updateReservationParMois() {
    this.appointmentService.getNRPM(this.dateMois).subscribe(
      (response: any) => {
        this.nbReservationParMois = response;
      }
    );
  }
}
