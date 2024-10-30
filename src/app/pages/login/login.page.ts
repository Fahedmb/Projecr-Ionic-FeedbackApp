import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
      await this.authService.signIn(this.credentials.value.email, this.credentials.value.password);
      await loading.dismiss();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Sign in failed',
        message: 'Please check your credentials and try again',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
