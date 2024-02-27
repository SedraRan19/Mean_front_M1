import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { EmployerService } from './employer.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { EmployeeFilterPipe } from './employer.filter.pipe';

interface activity {
  time: string;
  ringColor: string;
  message: string;
}

@Component({
  selector: 'app-employer',
  standalone: true,
  imports: [DemoFlexyModule,MatTableModule,CommonModule,HttpClientModule,FormsModule,FeatherModule],
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent {
  employees: any[] = [];
  isFormEdit: boolean = false;
  isVisibleFrom: boolean = false;
  isFullScreen: boolean = false;
  errorMessage: string = '';
  selectedEmp: any = null;
  searchTerm: string = '';
  newEmp = {
    firstName: '',
    lastName: '',
    email:'',
    role:'Employee',
    contact:'',
    confirmPassword:'',
    password:''
  }
  editingEmp: any = null;

  constructor(private employeeService: EmployerService,private employeeFilter: EmployeeFilterPipe){}

  ngOnInit():void{
    this.loadEmployee();
  }

  loadEmployee(){
    this.employeeService.getAllEmployee().subscribe((employees)=>{
      this.employees = employees;
      console.log(employees);
    });
  }

  filterEmployees(){
    if(this.searchTerm === ''){
      this.loadEmployee();
    }else{
      this.employees = this.employeeFilter.transform(this.employees,this.searchTerm);
    }
  }
  
  onSearchChange(){
    this.filterEmployees();
  }

  onSumbit(){
    if(this.editingEmp){
      const trueEmp ={
        firstName: this.newEmp.firstName,
        lastName: this.newEmp.lastName,
        email:this.newEmp.email,
        contact:this.newEmp.contact,
        password:this.newEmp.password
      }
      this.employeeService.updateEmployee(this.editingEmp._id,trueEmp).subscribe(
        (response)=>{
          this.loadEmployee();
          console.log('Employee modifié avec succès :',response);
        },
        (error)=>{
          console.log('Erreur lors de la modification de l\'employee :',error);
        }
      )
      this.newEmp = {firstName: '',lastName: '',email:'',confirmPassword:'',role:'Employee',contact:'',password:''}
      this.editingEmp = null;
      this.isVisibleFrom = false;
      this.errorMessage = '';
    }
    else{
      if(this.newEmp.confirmPassword == this.newEmp.password){
        this.employeeService.createEmployee(this.newEmp).subscribe(
          (response)=>{
            this.loadEmployee();
            this.isVisibleFrom = false;
            this.errorMessage = '';
            console.log('Employer cree avec successe',response);
          },
          (error)=>{
            console.log('Erreur lors de creation de l\'employee',error);
          }
        )
      }else{
        this.errorMessage = 'Mot de passe incorrect!';
      }
    }
  }

  onEdit(emp: any):void{
    this.newEmp = {...emp};
    this.editingEmp = emp;
    this.isVisibleFrom = true;
    this.isFormEdit = false;
  }

  onDelete(empId: string):void{
    this.employeeService.deleteEmployee(empId).subscribe(
      (response)=>{
        this.loadEmployee();
        console.log('Employer supprimer avec successe',response);
      },
      (error)=>{
        console.log('Erreur lors de creation de l\'employee',error);
      }
    )
  }

  showTask(empId: string){
    this.employeeService.getEmployeeById(empId).subscribe(
      (response)=>{
        this.selectedEmp = response;
        console.log('Data ',response);
      },
      (error)=>{
        console.log('Error tasks :',error);
      }
    )
    this.isFullScreen = !this.isFullScreen;
  }

  openNewEmployer(){
    this.newEmp = {
      firstName: '',
      lastName: '',
      email:'',
      role:'Employee',
      contact:'',
      confirmPassword:'',
      password:''
    }
    this.isVisibleFrom = !this.isVisibleFrom;
    this.isFormEdit = true;
  }

  closeNewEmployer(){
    this.isVisibleFrom = false;
  }

  activity: activity [] = [
    {
      time: "09.50",
      ringColor: "ring-success",
      message: "Meeting with John",
    },
    {
      time: "09.46",
      ringColor: "ring-primary",
      message: "Payment received from John Doe of $385.90",
    },
    {
      time: "09.47",
      ringColor: "ring-info",
      message: "Project Meeting",
    },
    {
      time: "09.48",
      ringColor: "ring-warning",
      message: "New Sale recorded #ML-3467",
    },
    {
      time: "09.49",
      ringColor: "ring-danger",
      message: "Payment was made of $64.95 to Michael Anderson",
    },
  ]
}
