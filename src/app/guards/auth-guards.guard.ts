import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userRole = await this.authService.getUserRole(user.uid);
      if (state.url === '/results' || state.url === '/presenterhome') {
        return true;
      } else if (userRole === 'audience' && state.url === '/home') {
        return true;
      } else if (userRole === 'presenter' && state.url === '/presenterhome') {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
