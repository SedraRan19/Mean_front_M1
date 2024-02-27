import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {
  private apiUrl = environment.apiUrl + 'depenses';

  constructor(private http: HttpClient) { }

  // création depense
  createDepense(depenseData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, depenseData);
  }

  // getDepenseById
  getDepenseById(depenseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all/${depenseId}`);
  }

  // getDepenses
  getDepense(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

   // deleteDepense
   deleteDepense(depenseId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${depenseId}`);
  }

   // updateDepense
   updateDepense(depenseId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${depenseId}`, updatedData);
  }
}
