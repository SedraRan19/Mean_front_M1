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
  user = { id: '', firstName: '', lastName: '', token: '' };
  employees: any = null;

  constructor(private employeeService: EmployerService) {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        this.user.id = decodedToken._id;
        this.user.firstName = decodedToken.firstName;
        this.user.lastName = decodedToken.lastName;
      }
    }
  }

  ngOnInit() {
    this.refreshPageOnce();
    this.loadEmployee();
  }

  refreshPageOnce() {
    if (!sessionStorage.getItem('pageRefreshed')) {
      sessionStorage.setItem('pageRefreshed', 'true');
      location.reload();
    }
  }

  loadEmployee() {
    this.employeeService.getEmployeeById(this.user.id).subscribe(
      (response) => {
        this.employees = response;
        this.initializeChart(response);
      },
      (error) => {
        console.log("Erreur lors de l'importation :", error);
      }
    )
  }

  initializeChart(employe: any) {
    // Récupérer le canvas du graphique
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    // Récupérer les données des tâches complétées par jour pour l'employé
    const chartData = this.getTasksCompletedPerDay(employe);

    // Créer le graphique
    this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Nombre de tâches effectuées',
                data: chartData.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
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


  getTasksCompletedPerDay(employe:any) {
    const tasksPerDay: any = {};

    for (const task of employe.tasksCompleted) {
        const taskDate = new Date(task.date);
        const dayKey = taskDate.toISOString().split('T')[0];

        if (tasksPerDay[dayKey]) {
            tasksPerDay[dayKey]++;
        } else {
            tasksPerDay[dayKey] = 1;
        }
    }

    const labels = Object.keys(tasksPerDay);
    const data = Object.values(tasksPerDay);
    
    return { labels, data };
}

}
