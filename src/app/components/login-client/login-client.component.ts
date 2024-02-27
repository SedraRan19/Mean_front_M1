import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss']
})
export class LoginClientComponent implements OnInit {
  email:string = 'test@gmail.com';
  password:string = '12345678';
  isSubmitting:boolean = false;
  validationErrors:Array<any> = [];
  message:string = '';

  constructor(public userAuthService: UserAuthService, private router: Router) {}
 
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
    this.userAuthService.login(payload)
    .then(({data}) => {
      if(data.success){
        sessionStorage.setItem('token', data.token);
        this.router.navigateByUrl('/dashboard-client');
      } else {
        if(data.msg == 'Client not found') this.message = "L'utilisateur n'existe pas";
        if(data.msg == 'Wrong password') this.message = "Mot de passe incorrect";
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