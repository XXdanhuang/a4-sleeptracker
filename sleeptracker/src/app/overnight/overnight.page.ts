
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
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonIcon,
  IonNote,
  IonToast,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  moonOutline,
  timeOutline,
  calendarOutline,
  sunnyOutline
} from 'ionicons/icons';

import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  styleUrls: ['./overnight.page.scss'],
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
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonButton,
    IonIcon,
    IonNote,
    IonToast,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel
  ]
})
export class OvernightPage {

  bedtime: string;
  wakeTime: string;

  showToast = false;
  toastMessage = '';

  constructor(private sleepService: SleepService) {

    // Register icons used by the Moonly UI
    addIcons({
      moonOutline,
      timeOutline,
      calendarOutline,
      sunnyOutline
    });

    // Default bedtime: yesterday at 11:00 PM
    const now = new Date();

    const bedtime = new Date(now);
    bedtime.setDate(bedtime.getDate() - 1);
    bedtime.setHours(23, 0, 0, 0);

    // Default wake-up time: today at 7:00 AM
    const wake = new Date(bedtime);
    wake.setDate(wake.getDate() + 1);
    wake.setHours(7, 0, 0, 0);

    this.bedtime = this.formatLocalDate(bedtime);
    this.wakeTime = this.formatLocalDate(wake);
  }

  // Convert Date to local date-time format
  private formatLocalDate(date: Date): string {

    const offset = date.getTimezoneOffset() * 60000;

    return new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, 16);
  }

  // Calculate sleep duration
  get sleepDuration(): string {

    const start = new Date(this.bedtime).getTime();
    const end = new Date(this.wakeTime).getTime();

    const difference = end - start;

    if (
      !Number.isFinite(difference) ||
      difference <= 0
    ) {
      return 'Invalid time range';
    }

    const hours = Math.floor(
      difference / 3600000
    );

    const minutes = Math.floor(
      (difference % 3600000) / 60000
    );

    return `${hours}h ${minutes}m`;
  }

  // Validate sleep times before saving
  get isValid(): boolean {

    const start = new Date(this.bedtime).getTime();
    const end = new Date(this.wakeTime).getTime();

    return (
      Number.isFinite(start) &&
      Number.isFinite(end) &&
      end > start &&
      end <= Date.now() &&
      end - start <= 24 * 60 * 60 * 1000
    );
  }

  // Save overnight sleep record
  saveSleep(): void {

    if (!this.isValid) {

      this.toastMessage =
        'Please check your sleep times.';

      this.showToast = true;
      return;
    }

    const start = new Date(this.bedtime);
    const end = new Date(this.wakeTime);

    const record = new OvernightSleepData(
      start,
      end
    );

    // Save using the existing SleepService
    this.sleepService.logOvernightData(record);

    // Show success message
    this.toastMessage =
      'Sweet dreams! Your sleep has been saved!';

    this.showToast = true;
  }
}
