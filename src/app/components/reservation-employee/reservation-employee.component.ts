import { Component } from '@angular/core';
import { AppointmentService } from '../reservations/reservations.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule, NgClass } from '@angular/common';
import { ReservationEmployeeFilterPipe } from './reservation-employee.filter.pipe';
import { EmployerService } from '../employer/employer.service';
import { FeatherModule } from 'angular-feather';

@Component({
  selector: 'app-reservation-employee',
  standalone: true,
  imports:[DemoFlexyModule,CommonModule,FormsModule,NgClass,FeatherModule],
  templateUrl: './reservation-employee.component.html',
  styleUrls: ['./reservation-employee.component.scss']
})

export class ReservationEmployeeComponent {
  alerts = {
    border: "",
    background: "",
    color: "",
    icon: "",
    iconColor: "",
    message: "",
  };
  appointments: any[] = [];
  searchTerm: string = '';
  user = { id: '',firstName: '', lastName: '', token: '' };
  loading:boolean = false;
  
  constructor(private appointmentService: AppointmentService,private reservationsEmployeeFilter: ReservationEmployeeFilterPipe,private employeService: EmployerService){
    const token = sessionStorage.getItem('token');
    if(token){
      const decodedToken: any = jwtDecode(token);
      if(decodedToken){
        this.user.id = decodedToken._id;
        this.user.firstName = decodedToken.firstName;
        this.user.lastName = decodedToken.lastName;
      }
    }
  }

  ngOnInit(){
    this.loadAppointment();
  }

  loadAppointment(){
    this.loading = true
    this.appointmentService.getAllAppointmentsForEmployee(this.user.id).subscribe(
      (response)=>{
        this.appointments = response;
        console.log(response);
        this.appointments.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.loading = false;
      },
      (error)=>{
        console.log('Erreur lors de l\'importation: ',error);
      }
    )
  }

  filterReservations(){
    if(this.searchTerm === ''){
      this.loadAppointment();
    }else{
      this.appointments = this.reservationsEmployeeFilter.transform(this.appointments,this.searchTerm);
    }
  }

  onSearchChange(){
    this.filterReservations();
  } 

  postAlertSuccess() {
    this.alerts = {
      border: "alert-border-success",
      background: "alert-success",
      color: "alert-text-success",
      icon: "check-circle",
      iconColor: "text-success",
      message: "This is a success alert — check it out!",
    };
  
    setTimeout(() => {
      this.resetAlert();
    }, 5000);
  }

  postAlertError() {
    this.alerts = {
      border: "alert-border-danger",
      background: "alert-danger",
      color: "alert-text-danger",
      icon: "alert-circle",
      iconColor: "text-danger",
      message: "This is an error alert — check it out!",
    };
  
    setTimeout(() => {
      this.resetAlert();
    }, 5000);
  }
  
  resetAlert() {
    this.alerts = {
      border: "",
      background: "",
      color: "",
      icon: "",
      iconColor: "",
      message: "",
    };
  }
  onDone(appoint: any){
    if(appoint.status === "Pending" || appoint.status === "Cancelled"){
      this.postAlertError();
    }
    if (appoint.status === "Confirmed") {
      for (let i = 0; i < appoint.requestedServices.length; i++) {
        if (appoint.requestedServices[i].selectedEmployee._id === this.user.id) {
          // console.log('date: ',appoint.appointmentDate);
          // console.log('Commission: ',appoint.requestedServices[i].serviceId.price*appoint.requestedServices[i].serviceId.commissionPercentage/100);
          const commission = appoint.requestedServices[i].serviceId.price*appoint.requestedServices[i].serviceId.commissionPercentage/100
          const newTask = {
            date: appoint.appointmentDate,
            commissionAmount: commission,
            serviceId: appoint.requestedServices[i].serviceId._id,
            appointmentId:appoint._id
          };
          console.log(newTask);
          this.employeService.createTask(this.user.id, newTask).subscribe(
            (response)=>{
              console.log("Tache cree avec succeess",response);
            },
            (error)=>{
              console.log("Error lors de la creation du tache",error);
            }
          );
        }
        this.postAlertSuccess();
      }
    }
  }

  isDatePassed(appointmentDate: string): boolean {
    const today = new Date();
    const dateToCompare = new Date(appointmentDate);
  
    return dateToCompare < today;
  }
  

}
