import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonRadio, IonButton, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonRadio, IonItem, IonLabel, IonListHeader, IonRadioGroup, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PresentationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
