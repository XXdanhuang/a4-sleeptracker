import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonDatetime,
  IonToast,
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { sunnyOutline, checkmarkCircleOutline } from 'ionicons/icons';

import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonDatetime,
    IonToast,
    IonIcon
  ]
})
export class SleepinessPage {

  rating: number | null = null;
  logTime: string = new Date().toISOString();

  showToast = false;
  toastMessage = '';

  sleepinessLevels = [
    { value: 1, label: 'Feeling active, vital, alert, or wide awake' },
    { value: 2, label: 'Functioning at high levels, but not at peak' },
    { value: 3, label: 'Awake, but relaxed; responsive but not fully alert' },
    { value: 4, label: 'Somewhat foggy, let down' },
    { value: 5, label: 'Foggy; losing interest in remaining awake' },
    { value: 6, label: 'Sleepy, woozy, fighting sleep' },
    { value: 7, label: 'Almost in reverie; sleep onset soon' }
  ];

  constructor(private sleepService: SleepService) {
    addIcons({ sunnyOutline, checkmarkCircleOutline });
  }

  selectRating(value: number) {
    this.rating = value;
  }

  saveSleepiness() {
    const date = new Date(this.logTime);

    if (
      this.rating === null ||
      Number.isNaN(date.getTime()) ||
      date.getTime() > Date.now()
    ) {
      this.toastMessage = 'Please select a valid rating and time.';
      this.showToast = true;
      return;
    }

    const sleepinessData = new StanfordSleepinessData(
      this.rating,
      date
    );

    this.sleepService.logSleepinessData(sleepinessData);

    this.toastMessage = 'Sleepiness recorded successfully!';
    this.showToast = true;

    this.rating = null;
    this.logTime = new Date().toISOString();
  }
}