import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
    private apiUrl = environment.apiUrl+'clients';

    constructor(private http: HttpClient){}

    getAllClientsManager(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/manager/all`);
    }

    deleteClient(clientId: string): Observable<any>{
      return this.http.delete<any>(`${this.apiUrl}/delete/${clientId}`);
    }

    createClient(client: any): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/register`,client);
    }

    updateClient(clientId: string, updateClientData: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/update/${clientId}`, updateClientData);
    }
}