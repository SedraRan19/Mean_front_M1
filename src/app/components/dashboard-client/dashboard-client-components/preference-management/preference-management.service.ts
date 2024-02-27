import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreferenceManagementService {
  private apiUrl = environment.apiUrl + 'clients';

  constructor(private http: HttpClient) { }

  // get client full by id
  getClientFullById(clientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/full/${clientId}`);
  }

  // create or add préférence client
  addClientPreference(clientId: string, serviceId: string, employeeId: string): Observable<any> {
    const bodyData = {
      "serviceId": serviceId,
      "employeeId": employeeId
    };
    return this.http.post<any>(`${this.apiUrl}/preferences/${clientId}`, bodyData );
  }
}
