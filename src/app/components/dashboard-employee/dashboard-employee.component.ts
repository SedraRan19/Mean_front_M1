import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { jwtDecode } from 'jwt-decode';
import { EmployerService } from '../employer/employer.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.scss']
})
export class DashboardEmployeeComponent {
  chart: any;
  user = { id: '',firstName: '', lastName: '', token: '' };
  employees: any = null;

  constructor(private employeeService: EmployerService){
    const token = sessionStorage.getItem('token');
    if(token){
      const decodedToken: any = jwtDecode(token);
      if(decodedToken){
        this.user.id = decodedToken._id;
        this.user.firstName = decodedToken.firstName;
        this.user.lastName = decodedToken.lastName;
      }
    }
  }

  ngOnInit() {
    this.refreshPageOnce();
    this.initializeChart();
    this.loadEmployee();
  }

  refreshPageOnce(){
    if (!sessionStorage.getItem('pageRefreshed')) {
      sessionStorage.setItem('pageRefreshed', 'true');
      location.reload();
    }
  }

  loadEmployee(){
    this.employeeService.getEmployeeById(this.user.id).subscribe(
      (response)=>{
        this.employees = response;
      },
      (error)=>{
        console.log("Erreur lors de l'importation :",error);
      }
    )
  }

  initializeChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2024-02-23', '2024-02-24', '2024-02-25', '2024-02-26', '2024-02-27'],
        datasets: [
          {
            label: 'Nombre de tâches effectuées',
            data: [5, 8, 12, 6, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
