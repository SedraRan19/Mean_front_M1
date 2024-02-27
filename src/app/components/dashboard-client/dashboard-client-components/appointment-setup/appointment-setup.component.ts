import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { AppointmentSetupService } from './appointment-setup.service';
import { ClientsService } from 'src/app/components/clients/clients.service';
import { EmployerService } from 'src/app/components/employer/employer.service';
import { ServicesService } from 'src/app/components/services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-appointment-setup',
  templateUrl: './appointment-setup.component.html',
  styleUrls: ['./appointment-setup.component.scss']
})
export class AppointmentSetupComponent {
  clientId: string = '';
  isVisibleFrom: boolean = false;
  isFormService: boolean = false;
  isEditEnabled: boolean = false;
  isServiceVisible: boolean = false;
  loading: boolean = false;
  isPaymentVisible: boolean = false;
  total_amount: number = 0;
  entered_amount: number = 0;
  credit_card: string = '';
  appointmentOnPayment: any = null;
  message_payment: string = '';
  payment_error: boolean = false;
  payment_succes: boolean = false;

  appointments: any[] = [];
  selectedAppointment: any;
  clients: any[] = [];
  employees: any[] = [];
  services: any[] = [];
  newAppoint = {
    clientId: '',
    appointmentDate: new Date().toISOString().slice(0, -1),
    requestedServices: [
      {
        serviceId: '',
        selectedEmployee: ''
      }
    ]
  };
  newService = {
    requestedServices: [
      {
        serviceId: '',
        selectedEmployee: ''
      }
    ]
  };
  editingAppoint: any = null;
  editingService: any = null;

  constructor(private appointmentSetupService: AppointmentSetupService, private clientService: ClientsService, private employeeService: EmployerService, private serviceService: ServicesService) {
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        this.clientId = decodedToken._id;
      }
    }

    this.loadAppointment();
    this.clientService.getAllClientsManager().subscribe((clients) => {
      this.clients = clients;
    });
    this.employeeService.getAllEmployee().subscribe((employees) => {
      this.employees = employees;
    });
    this.serviceService.getAllServices().subscribe((services) => {
      this.services = services;
    });
  }

  loadAppointment() {
    this.appointmentSetupService.getClientAppointment(this.clientId).subscribe(
      (appointments) => {
        this.appointments = appointments;
        console.log(appointments);
      }
    )
  };

  onSubmit() {
    if (this.editingAppoint) {
      this.appointmentSetupService.updateAppointment(this.editingAppoint._id, this.newAppoint).subscribe(
        (response) => {
          this.loadAppointment();
          console.log('Rendez-vous modifié avec succès :', response);
        },
        (error) => {
          console.log('Erreur lors de la modification du rendez-vous :', error);
        }
      )
      this.newAppoint = {
        clientId: this.clientId,
        appointmentDate: new Date().toISOString().slice(0, -1),
        requestedServices: [
          {
            serviceId: '',
            selectedEmployee: ''
          }
        ]
      };
      this.editingAppoint = null;
      this.isVisibleFrom = false;
    }
    else {
      this.appointmentSetupService.createAppointment(this.newAppoint).subscribe(
        (response) => {
          this.loadAppointment();
          this.isVisibleFrom = false;
          console.log('Rendez vous cree avec successe', response);
        },
        (error) => {
          console.log('Erreur lors de creation du rendez vous:', error);
        }
      )
    }
  };

  onSubmitService() {
    if (this.editingService) {
      this.appointmentSetupService.updateRequestedServices(this.editingAppoint._id, this.newService, this.editingService).subscribe(
        (response) => {
          this.isFormService = false;
          this.isServiceVisible = false;
          this.editingAppoint = null;
          this.editingService = null;
          this.newService = {
            requestedServices: [
              {
                serviceId: '',
                selectedEmployee: ''
              }
            ]
          };
          console.log('Service du rendez-vous modifié avec succès :', response);
        },
        (error) => {
          console.log('Erreur lors de la modification du service du rendez-vous :', error);
        }
      )

    } else {
      this.appointmentSetupService.createRequestedServices(this.editingAppoint._id, this.newService).subscribe(
        (response) => {
          this.isFormService = false;
          this.editingAppoint = null;
          console.log('Service cree avec successe', response);
        },
        (error) => {
          console.log('Erreur lors de creation du service:', error);
        }
      )
    }
  }

  onDelete(appointId: string) {
    this.appointmentSetupService.deleteAppointment(appointId).subscribe(
      (response) => {
        this.loadAppointment();
        console.log('Rendez vous supprimer avec successe', response);
      },
      (error) => {
        console.log('Erreur lors de la suppretion: ', error);
      }
    )
  }

  onDeleteRequestedServiceAppointment(appointmentId: any, requestedServiceId: any) {
    console.log(appointmentId);
    console.log(requestedServiceId);
    this.appointmentSetupService.deleteRequestedServiceAppointment(appointmentId, requestedServiceId).subscribe(
      (response) => {
        this.isServiceVisible = false;
        console.log('Service du rendez-vous supprimer avec success', response);
      },
      (error) => {
        console.log('Erreur lors de la suppression: ', error);
      }
    )

  }

  onEdit(appoint: any, service: any): void {
    this.editingService = {
      requestedServices: [
        {
          _id: service._id,
          serviceId: service.serviceId._id,
          selectedEmployee: service.selectedEmployee._id
        }
      ]
    };

    this.newService = {
      requestedServices: [
        {
          serviceId: service.serviceId._id,
          selectedEmployee: service.selectedEmployee._id
        }
      ]
    };

    this.editingAppoint = {
      _id: appoint._id
    }

    //this.isEditEnabled = false;
    this.isFormService = !this.isFormService;
  }

  onAdd(appoint: any) {
    this.editingAppoint = {
      _id: appoint._id,
      clientId: appoint.clientId._id,
      appointmentDate: new Date(appoint.appointmentDate).toISOString().slice(0, -1),
      requestedServices: [
        {
          serviceId: appoint.requestedServices[0].serviceId._id,
          selectedEmployee: appoint.requestedServices[0].selectedEmployee._id
        }
      ]
    }
    this.isFormService = !this.isFormService;
  }

  closeNewServise() {
    this.isFormService = false;
  }

  onService(appointId: string) {
    this.loading = true;
    this.isServiceVisible = !this.isServiceVisible;
    this.appointmentSetupService.getAppointmentById(appointId).subscribe(
      (response) => {
        this.selectedAppointment = response;
        console.log(response);
      },
      (error) => {
        console.log('Erreur lors de la recherche: ', error);
      },
      () => {
        this.loading = false
      }
    )
  }

  openNewReservation() {
    this.isVisibleFrom = !this.isVisibleFrom;
    this.isEditEnabled = true;
    this.newAppoint = {
      clientId: this.clientId,
      appointmentDate: new Date().toISOString().slice(0, -1),
      requestedServices: [
        {
          serviceId: '',
          selectedEmployee: ''
        }
      ]
    }
  }

  closeNewReservation() {
    this.isVisibleFrom = false;
  }

  onPayment(appoint: any) {
    console.log(appoint);
    this.appointmentOnPayment = appoint;
    let montant_total = 0;
    appoint.requestedServices.forEach((element: any) => {
      montant_total += element.serviceId.price;
    });
    this.total_amount = montant_total;
    this.isPaymentVisible = true;
  }

  onClosePayment() {
    this.clearPayment();
  }

  onSubmitPayment() {
    if (this.entered_amount == this.total_amount) {
      if (this.isValidCreditCardNumber(this.credit_card)) {
        this.appointmentOnPayment.status = 'Confirmed';
        this.message_payment = 'Paiement avec succés';
        this.payment_error = false;
        this.payment_succes = true;
        this.appointmentSetupService.updateAppointment(this.appointmentOnPayment._id, this.appointmentOnPayment).subscribe(
          (response) => {
            this.loadAppointment();
            console.log('Rendez-vous payé avec succès :', response);
          },
          (error) => {
            console.log('Erreur lors de la modification du rendez-vous :', error);
          }
        );

        setTimeout(() => {
          this.clearPayment();
        }, 2000);

      } else {
        this.message_payment = 'Carte de crédit invalide : 16 chiffres';
        this.payment_error = true;
      }

    } else {
      this.message_payment = 'Veuillez vérifier le montant';
      this.payment_error = true;
    }

  }

  isValidCreditCardNumber(cardNumber: string): boolean {
    const digitsOnly = cardNumber.replace(/\D/g, '');
    if (digitsOnly.length == 16) {
      return true;
    } else {
      return false;
    }
    /*const digitArray = digitsOnly.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < digitArray.length; i++) {
      let digit = digitArray[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;*/
  }

  clearPayment() {
    this.total_amount = 0;
    this.entered_amount = 0;
    this.credit_card = '';
    this.appointmentOnPayment = null;
    this.message_payment = '';
    this.payment_error = false;
    this.payment_succes = false;
    this.isPaymentVisible = false;
  }
}
