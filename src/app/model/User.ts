import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export interface User {
  email: string;
  password: string;
  role: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user: User | null = this.authService.getCurrentUser() as User | null;
    if (user !== null && user.role === 'audience') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
