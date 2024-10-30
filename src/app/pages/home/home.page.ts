import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonRow, IonGrid, IonCol, IonImg, AlertController } from '@ionic/angular/standalone';
import { ReactionService } from '../../services/reaction.service';
import { AuthService } from '../../services/auth.service';

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

  constructor(private alertCtrl: AlertController, private reactionService: ReactionService, private authService: AuthService) { }

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
    const user = this.authService.getCurrentUser();
    if (user) {
      const presentationId = 'default'; // Use a default presentation ID
      await this.reactionService.addReaction(presentationId, user.uid, feedback);
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
