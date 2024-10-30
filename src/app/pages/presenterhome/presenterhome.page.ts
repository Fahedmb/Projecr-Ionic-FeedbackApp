import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButtons, IonCard, IonCardTitle, IonCardHeader, IonGrid, IonRow, IonCol, IonButton, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presenterhome',
  templateUrl: './presenterhome.page.html',
  styleUrls: ['./presenterhome.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButton, IonCol, IonRow, IonGrid, IonCardHeader, IonCardTitle, IonCard, IonButtons, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PresenterhomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToResults() {
    this.router.navigateByUrl('/results', { replaceUrl: true });
  }
}
