import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService {
  private apiUrl = environment.apiUrl + 'speciales';

  constructor(private http: HttpClient) { }

  // création speciale
  createSpeciale(specialeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, specialeData);
  }

  // getSpecialeById
  getSpecialeById(specialeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all/${specialeId}`);
  }

  // getSpecial
  getSpecial(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

   // deleteSpeciale
   deleteSpeciale(specialeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${specialeId}`);
  }

  // updateSpeciale
  updateSpeciale(specialeId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${specialeId}`, updatedData);
  }

}
