import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonRow, IonGrid, IonCol, IonImg, IonLabel, AlertController } from '@ionic/angular/standalone';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonImg, IonCol, IonGrid, IonRow, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  rooms: any[] = [];
  joinedRoom: string | null = null;
  isCooldown: boolean = false;
  cooldownTime: number = 10; // Cooldown time in seconds
  remainingTime: number = this.cooldownTime;

  constructor(private alertCtrl: AlertController, private roomService: RoomService, private authService: AuthService) { }

  ngOnInit() {
    this.loadRooms();
  }

  async loadRooms() {
    this.rooms = await this.roomService.getRooms();
  }

  async joinRoom(roomId: string) {
    this.joinedRoom = roomId;
    const alert = await this.alertCtrl.create({
      header: 'Room Joined',
      message: 'You have joined the room successfully.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async giveFeedback(feedback: string) {
    if (!this.joinedRoom) {
      const alert = await this.alertCtrl.create({
        header: 'No Room Joined',
        message: 'You must join a room to give feedback.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.isCooldown) {
      const alert = await this.alertCtrl.create({
        header: 'Cooldown Active',
        message: `Please wait ${this.remainingTime} seconds before giving feedback again.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    console.log(`User feedback: ${feedback}`);
    const user = this.authService.getCurrentUser();
    if (user) {
      await this.roomService.addReaction(this.joinedRoom, user.uid, feedback);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Not Authenticated',
        message: 'You must be logged in to give feedback.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.isCooldown = true;
    this.startCooldown();
  }

  startCooldown() {
    this.remainingTime = this.cooldownTime;
    const interval = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        clearInterval(interval);
        this.isCooldown = false;
      }
    }, 1000);
  }
}
