import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EmployerService } from 'src/app/components/employer/employer.service';
import { combineLatest } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-temp-moyen-travail-employe',
  templateUrl: './temp-moyen-travail-employe.component.html',
  styleUrls: ['./temp-moyen-travail-employe.component.scss']
})
export class TempMoyenTravailEmployeComponent {
  chartTempsMoyenTravailParEmployeParJour: any;
  chartTempsMoyenTravailParEmployeParMois: any;
  employees: any[] = [];


  constructor(private employeeService: EmployerService){}

  ngOnInit() {
    this.loadEmployee();
  }

  initializeChartTempsMoyenTravailParEmployeParJour() {
    const labels: string[] = [];
    let data: any[] = [];

    const observables = this.employees.map((employe) => {
      return this.employeeService.getTMTJById(employe._id);
    });

    combineLatest(observables).subscribe((results) => {
      results.forEach((result, index) => {
        labels.push(this.employees[index].firstName);
        data.push(result);
      });
  
      // Maintenant que les données sont disponibles, créer le graphique
      const dataParJour = {
        labels: labels,
        datasets: [{
          label: 'Temps moyen de travail par jour',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: data
        }]
      };
  
      const ctxParJour = document.getElementById('chartTempsMoyenTravailParEmployeParJour') as HTMLCanvasElement;
      /*var ctx = document.getElementById('myChart'); // node
      var ctx = document.getElementById('myChart').getContext('2d'); // 2d context
      var ctx = $('#myChart'); // jQuery instance
      var ctx = 'myChart'; // element id*/

      this.chartTempsMoyenTravailParEmployeParJour = new Chart(ctxParJour, {
        type: 'bar',
        data: dataParJour,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temps moyen de travail (heures)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Employé'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Temps moyen de travail par employé par jour'
            }
          }
        }
      });
    });
  }

  initializeChartTempsMoyenTravailParEmployeParMois() {
    const labels: string[] = [];
    let data: any[] = [];

    const observables = this.employees.map((employe) => {
      return this.employeeService.getTMTMById(employe._id);
    });

    combineLatest(observables).subscribe((results) => {
      results.forEach((result, index) => {
        labels.push(this.employees[index].firstName);
        data.push(result);
      });
  
      // Maintenant que les données sont disponibles, créer le graphique
      const dataParMois = {
        labels: labels,
        datasets: [{
          label: 'Temps moyen de travail par mois',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: data
        }]
      };
  
      const ctxParMois = document.getElementById('chartTempsMoyenTravailParEmployeParMois') as HTMLCanvasElement;
      this.chartTempsMoyenTravailParEmployeParMois = new Chart(ctxParMois, {
        type: 'bar',
        data: dataParMois,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Temps moyen de travail (heures)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Employé'
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Temps moyen de travail par employé par mois'
            }
          }
        }
      });
    });
  }

  loadEmployee(): void{
    this.employeeService.getAllEmployee().subscribe((employees)=>{
      this.employees = employees;
      this.initializeChartTempsMoyenTravailParEmployeParJour();
      this.initializeChartTempsMoyenTravailParEmployeParMois();
    });
  }


}
