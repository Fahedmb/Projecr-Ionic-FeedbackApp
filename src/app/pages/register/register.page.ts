import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]], // Add confirmPassword field
      gender: ['', [Validators.required]], // Add gender field
      role: ['', [Validators.required]] // Add role field
    });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }

  get gender() {
    return this.credentials.get('gender');
  }

  get role() {
    return this.credentials.get('role');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]], // Add confirmPassword field
      gender: ['', [Validators.required]], // Add gender field
      role: ['', [Validators.required]] // Add role field
    });
  }

  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      const userCredential = await this.authService.signUp(
        this.credentials.value.email,
        this.credentials.value.password,
        this.credentials.value.role // Pass role to signUp method
      );
      await loading.dismiss();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (error) {
      console.error('Registration error:', error);
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Registration failed',
        message: 'Please check your details and try again',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
