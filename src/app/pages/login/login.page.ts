import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/User'; // Import the User interface

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router
  ) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      console.log('Attempting to sign in with:', this.credentials.value.email);
      const userCredential = await this.authService.signIn(this.credentials.value.email, this.credentials.value.password);
      console.log('User signed in:', userCredential);
      const user = userCredential.user;
      // Fetch the user's role from your database or another source
      const userRole = await this.authService.getUserRole(user.uid); // Implement this method in AuthService
      console.log('User role:', userRole);
      await loading.dismiss();
      if (userRole === 'audience') {
        console.log('Redirecting to /home');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        console.log('Redirecting to /presenterhome');
        this.router.navigateByUrl('/presenterhome', { replaceUrl: true });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Sign in failed',
        message: 'Please check your credentials and try again',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register', { replaceUrl: true });
  }
}
