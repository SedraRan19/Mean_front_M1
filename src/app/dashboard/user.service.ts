import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl+'users';

  constructor(private http: HttpClient){}

  // le chiffre d'affaires par jour
  getCAPJ(date: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/capj`, { params: { date: date } });
  }

  // le chiffre d'affaires par mois
  getCAPM(date: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/capm`, { params: { date: date } });
  }

  // le bénéfice par jour
  getBPJ(date: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bpj`, { params: { date: date } });
  }

  // le bénéfice par mois
  getBPM(date: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bpm`, { params: { date: date } });
  }

}
