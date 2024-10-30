import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-presenterhome',
  templateUrl: './presenterhome.page.html',
  styleUrls: ['./presenterhome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PresenterhomePage implements OnInit {
  roomForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.roomForm = this.fb.group({
      roomName: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  async createRoom() {
    const user = this.authService.getCurrentUser();
    if (user) {
      await this.roomService.createRoom(user.uid, this.roomForm.value.roomName);
      const alert = await this.alertCtrl.create({
        header: 'Room Created',
        message: 'Your room has been created successfully.',
        buttons: ['OK']
      });
      await alert.present();
      this.roomForm.reset();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Not Authenticated',
        message: 'You must be logged in to create a room.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  redirectToResults() {
    this.router.navigateByUrl('/results', { replaceUrl: true });
  }
}
