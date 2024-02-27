import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../user-auth.service';

@Component({
  selector: 'app-inscription-client',
  templateUrl: './inscription-client.component.html',
  styleUrls: ['./inscription-client.component.scss'],
})
export class InscriptionClientComponent implements OnInit {
  firstName:string = '';
  lastName:string = '';
  email:string = '';
  password:string = '';
  confirmPassword:string = '';
  contact:string = '';
  isSubmitting:boolean = false;
  validationErrors:any = [];
  message:string = '';
  valide:boolean = false;
  
  constructor(public userAuthService: UserAuthService, private router: Router) {}
 
  ngOnInit(): void { }
 
  registerAction() {
    //this.isSubmitting = true;
    if(this.password != this.confirmPassword) {
      this.message = 'Vérifiez votre mot de passe';
    } else {
      let payload = {
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password,
        contact:this.contact
      }
  
      this.userAuthService.register(payload)
      .then(({data}) => {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.contact = '';
        this.isSubmitting = false;
  
        if(data.success){
          this.valide = true;
          this.message = 'Inscription avec succès';
        } else {
          this.valide = false;
          if(data.msg == 'Email already in use') this.message = "L'adresse email existe déjà";
          if(data.msg == 'Failed to register client') this.message = "Une erreur est survenue";
        }
  
        return data;
      }).catch(error => {
        this.isSubmitting = false;
        this.valide = false;
        if (error.response.data.errors != undefined) {
          this.validationErrors = error.response.data.errors
        }
        if(error.response.data.msg == 'Email already in use') this.message = "L'Email existe déjà";
        if(error.response.data.msg == 'Failed to register client') this.message = "Une erreur est survenue";
        return error
      })
    }
    
    
  }
}