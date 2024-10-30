import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonGrid, IonCol, IonButton, IonImg, IonRow, IonLabel } from '@ionic/angular/standalone';
import { ReactionService } from '../../services/reaction.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [IonLabel, IonRow, IonImg, IonButton, IonCol, IonGrid, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResultsPage implements OnInit {
  reactions: any[] = [];
  feedbackCounts: { [key: string]: number } = {
    good: 0,
    smile: 0,
    mid: 0,
    elims: 0,
    weird: 0
  };

  constructor(private reactionService: ReactionService) { }

  ngOnInit() {
    this.loadReactions();
  }

  async loadReactions() {
    const presentationId = 'default'; // Use a default presentation ID
    this.reactions = await this.reactionService.getReactions(presentationId);
    this.countFeedback();
  }

  countFeedback() {
    this.reactions.forEach(reaction => {
      if (this.feedbackCounts[reaction.reaction] !== undefined) {
        this.feedbackCounts[reaction.reaction]++;
      }
    });
  }
}
