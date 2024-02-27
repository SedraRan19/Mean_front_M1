import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ServicesService } from '../services/services.service';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface cards {
  image: string;
  btn: string;
}

@Component({
  selector: 'app-dashboard-client',
  standalone: true,
  imports:[DemoFlexyModule,CommonModule,FormsModule],
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  services: any[] = [];
  loading: boolean = false;

  constructor(private router: Router,private serviceService: ServicesService) {}
  
  ngOnInit(): void {
    function refreshPageOnce() {
      if (!sessionStorage.getItem('pageRefreshed')) {
        sessionStorage.setItem('pageRefreshed', 'true');
        location.reload();
      }
    }
    refreshPageOnce();
    const token = sessionStorage.getItem('token');
    if(token){
      const decodedToken = jwtDecode(token);
      //console.log(decodedToken);
    }
    this.loadService();
  }

  onAppointment(){
    this.router.navigate(['/appointment-setup-client'])
  }

  loadService(){
    this.loading = true;
    this.serviceService.getAllServices().subscribe(
      (services) => {
        this.services = services;
        console.log(services);
        this.loading = false; 
      },
      (error) => {
        console.error('Erreur lors du chargement des services :', error);
        this.loading = false; 
      }
    );
  }

  cards: cards [] = [
    {
      image: "assets/images/u2.webp",
      btn: "warn",
    },
  ]

}