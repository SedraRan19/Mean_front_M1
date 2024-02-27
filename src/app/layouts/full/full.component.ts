import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

interface user {
  firstName: string;
  lastName: string;
  token: string;
  role: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken) {
        console.log(decodedToken);
        if (decodedToken.role == 'Client') {
          this.addClientMenu();
          this.setUser(decodedToken.firstName, decodedToken.lastName, token, decodedToken.role);
        }
        if (decodedToken.role == 'Employee') {
          this.addEmployeeMenu(); 
          //this.addEmployeeMenu(); 
          this.setUser(decodedToken.firstName, decodedToken.lastName, token, decodedToken.role);
        }
        if (decodedToken.role == 'Manager') {
          this.addManagerMenu();
          // this.addManagerMenu();
          this.setUserManager(decodedToken.name, token, decodedToken.role);
        }
      }

    }

  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [];
  user: user = { firstName: '', lastName: '', token: '', role: '' };

  setUser(firstName: string, lastName: string, token: string, role: string): void {
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.token = token;
    this.user.role = role;
  }

  setUserManager(firstName: string, token: string, role: string): void {
    this.user.firstName = firstName;
    this.user.token = token;
    this.user.role = role;
  }

  logOut(): void {
    sessionStorage.clear();
    sessionStorage.setItem('logout', 'true');
    if(this.user.role == "Client"){
      this.router.navigateByUrl('/login-client');
    } else {
      this.router.navigateByUrl('/login-employee-manager');
    }
    
  }

  addClientMenu(): void {
    this.sidebarMenu.push(
      {
        link: "/dashboard-client",
        icon: "home",
        menu: "Accueil",
      },
      {
        link: "/appointment-setup-client",
        icon: "calendar",
        menu: "Rendez-vous",
      },
      {
        link: "/preference-management-client",
        icon: "list",
        menu: "Préférences",
      }
    );
  }

  addEmployeeMenu(): void{
    this.sidebarMenu.push(
      {
        link: "/dashboard-employee",
        icon: "home",
        menu: "Dashboard",
      },
      {
        link: "/reservation-employee",
        icon: "calendar",
        menu: "Reservations",
      },
      {
        link: "/profile-employee",
        icon: "user",
        menu: "My account",
      },
    )
  }

  addManagerMenu(): void {
    this.sidebarMenu.push(
      {
        link: "/home",
        icon: "home",
        menu: "Dashboard",
      },
      {
        link: "/reservations",
        icon: "calendar",
        menu: "Reservations",
      },
      {
        link: "/services",
        icon: "sliders",
        menu: "Services",
      },
      {
        link: "/employers",
        icon: "users",
        menu: "Employer",
      },
      {
        link: "/clients",
        icon: "user",
        menu: "Clients",
      },      
      {
        link: "/special-offer",
        icon: "gift",
        menu: "Offres spéciales",
      },  
      {
        link: "/depense",
        icon: "credit-card",
        menu: "Dépenses",
      }
      // {
      //   link: "/tasks",
      //   icon: "list",
      //   menu: "Tasks",
      // },
    );
  }

  goToAdmin(){
    this.router.navigate(['/login-employee-manager'])
  }


}