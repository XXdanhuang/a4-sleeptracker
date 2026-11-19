
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  IonIcon,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  sunnyOutline,
  moonOutline,
  calendarOutline,
  checkmarkCircleOutline,
  refreshOutline
} from 'ionicons/icons';

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
    RouterLink,
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
    IonIcon,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel
  ]
})
export class SleepinessPage {

  // Currently selected Stanford Sleepiness Scale rating
  rating: number | null = null;

  // Date and time of the check-in
  logTime: string = new Date().toISOString();

  // Toast feedback
  showToast = false;
  toastMessage = '';

  // Stanford Sleepiness Scale descriptions
  sleepinessLevels = [
    {
      value: 1,
      label: 'Feeling active, vital, alert, or wide awake'
    },
    {
      value: 2,
      label: 'Functioning at high levels, but not at peak'
    },
    {
      value: 3,
      label: 'Awake, but relaxed; responsive but not fully alert'
    },
    {
      value: 4,
      label: 'Somewhat foggy, let down'
    },
    {
      value: 5,
      label: 'Foggy; losing interest in remaining awake'
    },
    {
      value: 6,
      label: 'Sleepy, woozy, fighting sleep'
    },
    {
      value: 7,
      label: 'Almost in reverie; sleep onset soon'
    }
  ];

  constructor(private sleepService: SleepService) {

    // Register Moonly icons
    addIcons({
      sunnyOutline,
      moonOutline,
      calendarOutline,
      checkmarkCircleOutline,
      refreshOutline
    });

  }

  // Select a sleepiness rating
  selectRating(value: number): void {
    this.rating = value;
  }

  // Reset the current check-in without deleting saved records
  resetForm(): void {

    // Clear the selected rating
    this.rating = null;

    // Restore the current date and time
    this.logTime = new Date().toISOString();

    // Show reset confirmation
    this.toastMessage = 'Check-in has been reset.';
    this.showToast = true;

  }

  // Save daytime sleepiness record
  saveSleepiness(): void {

    const date = new Date(this.logTime);

    // Validate rating and date
    if (
      this.rating === null ||
      Number.isNaN(date.getTime()) ||
      date.getTime() > Date.now()
    ) {

      this.toastMessage =
        'Please select a valid rating and time.';

      this.showToast = true;
      return;
    }

    // Create a Stanford Sleepiness Scale record
    const sleepinessData = new StanfordSleepinessData(
      this.rating,
      date
    );

    // Save the record through SleepService
    this.sleepService.logSleepinessData(sleepinessData);

    // Show success message
    this.toastMessage =
      'Sleepiness recorded successfully!';

    this.showToast = true;

    // Clear the form after saving
    this.rating = null;
    this.logTime = new Date().toISOString();

  }

}
