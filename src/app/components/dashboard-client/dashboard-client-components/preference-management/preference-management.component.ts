import { Component } from '@angular/core';
import { ServicesService } from 'src/app/components/services/services.service';
import { EmployerService } from 'src/app/components/employer/employer.service';
import { PreferenceManagementService } from './preference-management.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-preference-management',
  templateUrl: './preference-management.component.html',
  styleUrls: ['./preference-management.component.scss']
})
export class PreferenceManagementComponent {
  clientId: string = '';
  client: any;
  services: any[] = [];
  employees: any[] = [];
  newPreference = {
    serviceId: '',
    employeeId: ''
  };

  constructor(private serviceService: ServicesService, private preferenceManagementService: PreferenceManagementService, private employeeService: EmployerService) {
  }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        this.clientId = decodedToken._id;
      }
    }

    this.preferenceManagementService.getClientFullById(this.clientId).subscribe((client) => {
      this.client = client.data;
      this.newPreference = {
        serviceId: this.client.preferences.serviceId._id,
        employeeId: this.client.preferences.employeeId._id
      }
    });
    this.employeeService.getAllEmployee().subscribe((employees) => {
      this.employees = employees;
    });
    this.serviceService.getAllServices().subscribe((services) => {
      this.services = services;
    });
  }

  addPreferrence(){
    console.log(this.clientId, this.newPreference.serviceId, this.newPreference.employeeId);
    this.preferenceManagementService.addClientPreference(this.clientId, this.newPreference.serviceId, this.newPreference.employeeId).subscribe(
      (response) => {
        console.log('Préférence créée avec successe', response);
      },
      (error) => {
        console.log('Erreur lors de creation de la préférence:', error);
      }
    );
  }

}
