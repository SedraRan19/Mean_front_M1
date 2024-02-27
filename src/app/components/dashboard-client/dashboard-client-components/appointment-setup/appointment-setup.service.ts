import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSetupService {
  private apiUrl = environment.apiUrl + 'appointments';

  constructor(private http: HttpClient) { }

  // création rdv
  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, appointmentData);
  }

  // getClientAppointment
  getClientAppointment(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientAppointments/${clientId}`);
  }

  // deleteClientAppointment
  deleteAppointment(appointmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${appointmentId}`);
  }

  // deleteClientRequestedServiceAppointment
  deleteRequestedServiceAppointment(appointmentId: string, requestedServiceId: any): Observable<any> {
    const rsId = {
      requestedServiceId: requestedServiceId
    };
    return this.http.delete<any>(`${this.apiUrl}/requestedService/${appointmentId}`, { body: rsId });
  }

  // createRequestedService
  createRequestedServices(appointmentId: string, requestedServicesData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/requestedService/${appointmentId}`, requestedServicesData);
  }

  // updateResquestedService
  updateRequestedServices(appointmentId: string, requestedServicesData: any, editingService: any): Observable<any> {
    const requestData = {
      requestedServices: [
        {
          _id: editingService.requestedServices[0]._id,
          serviceId: requestedServicesData.requestedServices[0].serviceId,
          selectedEmployee: requestedServicesData.requestedServices[0].selectedEmployee
        }
      ]
    };
    return this.http.put<any>(`${this.apiUrl}/requestedService/${appointmentId}`, requestData);
  }

  // updateClientAppointment
  updateAppointment(appointmentId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${appointmentId}`, updatedData);
  }

  getAppointmentById(appointmentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/appointment/${appointmentId}`);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getFullAppointment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/full`);
  }
}
