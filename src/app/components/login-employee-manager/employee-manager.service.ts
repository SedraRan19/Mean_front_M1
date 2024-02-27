import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagerService {

  constructor() { }

  loginEmployee(data:any): Promise<any>{
    let payload = {
      email: data.email,
      password: data.password
    }

    return axios.post('/employees/authenticate', payload)
  }

  loginManager(data:any): Promise<any>{
    let payload = {
      email: data.email,
      password: data.password
    }
  
    return axios.post('/users/authenticate', payload)
  }
}
