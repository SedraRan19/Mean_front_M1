import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { concat } from 'rxjs';
import { EmployerService } from '../employer/employer.service';

@Component({
  selector: 'app-profile-employee',
  standalone: true,
  imports:[DemoFlexyModule,CommonModule,NgClass,FormsModule,FeatherModule],
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.scss']
})
export class ProfileEmployeeComponent {
  isVisibleFrom: boolean = false;
  isFormEdit:boolean = false;
  errorMessage = '';  
  user = { id: '',firstName: '', lastName: '',email:'',contact:'', token: '' };
  emp = {
    firstName: '',
    lastName: '',
    email:'',
    role:'Employee',
    contact:'',
    confirmPassword:'',
    password:''
  }
  alerts = {
    border: "",
    background: "",
    color: "",
    icon: "",
    iconColor: "",
    message: "",
  };

  constructor(private employeeService: EmployerService){
    const token = sessionStorage.getItem('token');
    if(token){
      const decodedToken: any = jwtDecode(token);
      if(decodedToken){
        this.user.id = decodedToken._id;
        this.user.firstName = decodedToken.firstName;
        this.user.lastName = decodedToken.lastName;
        this.user.email = decodedToken.email;
        this.user.contact = decodedToken.contact;
      }
    } 
  } 

  ngOnInit(){
    this.emp.firstName = this.user.firstName;
    this.emp.lastName = this.user.lastName;
    this.emp.email = this.user.email;
    this.emp.contact = this.user.contact 
  }

  onSumbit(){
    if(this.isFormEdit === false){
      const trueEmp ={
        firstName: this.emp.firstName,
        lastName: this.emp.lastName,
        email:this.emp.email,
        contact:this.emp.contact
        // password:this.emp.password
      }
      this.employeeService.updateEmployee(this.user.id,trueEmp).subscribe(
        (response)=>{
          console.log('Employee modifié avec succès :',response);
        },
        (error)=>{
          console.log('Erreur lors de la modification de l\'employee :',error);
        }
      )
      this.postAlertSuccess();
    }else{
      if(this.emp.confirmPassword != this.emp.password){
        this.postAlertError();
      }else{
        const trueEmp ={
          password:this.emp.password
        }
        this.employeeService.updateEmployee(this.user.id,trueEmp).subscribe(
          (response)=>{
            console.log('Employee modifié avec succès :',response);
          },
          (error)=>{
            console.log('Erreur lors de la modification de l\'employee :',error);
          }
        )
        this.postAlertSuccess();
      }
    }
    
  }

  openEditPassword(){
    this.isFormEdit = !this.isFormEdit;
  } 

  resetAlert() {
    this.alerts = {
      border: "",
      background: "",
      color: "",
      icon: "",
      iconColor: "",
      message: "",
    };
  }

  postAlertError() {
    this.alerts = {
      border: "alert-border-danger",
      background: "alert-danger",
      color: "alert-text-danger",
      icon: "alert-circle",
      iconColor: "text-danger",
      message: "Verifie le mot de passe !",
    };
  
    setTimeout(() => {
      this.resetAlert();
    }, 5000);
  }

  postAlertSuccess() {
    this.alerts = {
      border: "alert-border-success",
      background: "alert-success",
      color: "alert-text-success",
      icon: "check-circle",
      iconColor: "text-success",
      message: "Modifié avec success !",
    };
  
    setTimeout(() => {
      this.resetAlert();
    }, 5000);
  }

  
}
