import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonRow, IonGrid, IonCol, IonImg, AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonImg, IonCol, IonGrid, IonRow, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {
  isCooldown: boolean = false;
  cooldownTime: number = 10; // Cooldown time in seconds
  remainingTime: number = this.cooldownTime;

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async giveFeedback(feedback: string) {
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
    // Here you can add logic to send the feedback to a server or handle it as needed

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
