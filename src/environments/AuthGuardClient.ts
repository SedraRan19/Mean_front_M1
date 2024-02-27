// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardClient implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');

    if (token) {
      return true;
    } else {
      // Rediriger vers la page de connexion si le token est absent
      this.router.navigate(['/login-client']); 
      return false;
    }
  }
}
