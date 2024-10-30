import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonGrid, IonCol, IonButton, IonImg, IonRow, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [IonLabel, IonRow, IonImg, IonButton, IonCol, IonGrid, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ResultsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
