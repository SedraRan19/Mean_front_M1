import { Injectable } from '@angular/core';
import axios from 'axios';
 
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
 
  constructor() { }
 
  login(data:any): Promise<any>{
    let payload = {
      email: data.email,
      password: data.password
    }
  
    // return axios.post('/api/login', payload)
    return axios.post('/clients/authenticate', payload)
  }
 
  register(data:any): Promise<any>{
    let payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      contact: data.contact
    }

    //return axios.post('/api/register', payload)
    return axios.post('/clients/register', payload)
  }
 
  getUser(): Promise<any>{
 
    return axios.get('/api/user', { headers:{Authorization: sessionStorage.getItem('token')}})
  }
 
  logout(): Promise<any>{
 
    return axios.post('/api/logout',{}, { headers:{Authorization: sessionStorage.getItem('token')}})
  }
}