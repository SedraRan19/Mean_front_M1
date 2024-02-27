import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { EmployerService } from '../employer/employer.service';

interface Task {
  service: string;
  duration: string;
  serviceId: string;
}

interface Employee {
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DemoFlexyModule,MatTableModule,CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  employees: any[] = [];
  constructor(private employeeService: EmployerService){}
  
  ngOnInit(){
    this.loadEmployee();
  }

  loadEmployee(){
    this.employeeService.getAllEmployee().subscribe((employees)=>{
      this.employees = employees;
      console.log(employees);
    });
  }

}
