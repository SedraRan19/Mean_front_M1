import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeManagerService } from './employee-manager.service';

@Component({
  selector: 'app-login-employee-manager',
  templateUrl: './login-employee-manager.component.html',
  styleUrls: ['./login-employee-manager.component.scss']
})
export class LoginEmployeeManagerComponent {
  email:string = 'admin@gmail.com';
  password:string = '1234';
  isSubmitting:boolean = false;
  validationErrors:Array<any> = [];
  message:string = '';

  constructor(public employeeMangerService: EmployeeManagerService, private router: Router) {}
 
  ngOnInit(): void {
    if(sessionStorage.getItem('logout')){
      location.reload();
      sessionStorage.clear();
    }
    
    /*if(sessionStorage.getItem('token') != "" && sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != undefined){
      this.router.navigateByUrl('/dashboard-client');
    }*/
  }
 
  loginAction() {
    //this.isSubmitting = true;
    let payload = {
      email:this.email,
      password: this.password,
    }

    // parcours manager
    this.employeeMangerService.loginManager(payload)
    .then(({data}) => {
      if(data.success){
        sessionStorage.setItem('token', data.token);
        this.router.navigateByUrl('/home');
      } else {
        let notFoundManager = false;
        let wrongPwdManager = false;
        if(data.msg == 'Manager not found') notFoundManager = true;
        if(data.msg == 'Wrong password') wrongPwdManager = true;

        // parcours employee
        this.employeeMangerService.loginEmployee(payload)
        .then(({data}) => {
          if(data.success){
            sessionStorage.setItem('token', data.token);
            this.router.navigateByUrl('/dashboard-employee');
          } else {
            if(data.msg == 'Employee not found' || notFoundManager) this.message = "L'utilisateur n'existe pas";
            if(data.msg == 'Wrong password'|| wrongPwdManager) this.message = "Mot de passe incorrect";
          }
          return data
        }).catch(error => {
          this.isSubmitting = false;
          if (error.response.data.errors != undefined) {
            this.validationErrors = error.response.data.message;
          }
          if (error.response.data.error != undefined) {
            this.validationErrors = error.response.data.error;
          }
          return error
        })
        
      }
      return data
    }).catch(error => {
      this.isSubmitting = false;
      if (error.response.data.errors != undefined) {
        this.validationErrors = error.response.data.message;
      }
      if (error.response.data.error != undefined) {
        this.validationErrors = error.response.data.error;
      }
      return error
    })
  }

}
