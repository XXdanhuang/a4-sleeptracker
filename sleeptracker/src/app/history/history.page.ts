
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  AlertController,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  moonOutline,
  sunnyOutline,
  timeOutline,
  calendarOutline,
  trashOutline
} from 'ionicons/icons';

import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

type HistoryFilter = 'all' | 'overnight' | 'sleepiness';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonFooter,
    IonTabBar,
    IonTabButton,
    IonLabel
  ]
})
export class HistoryPage {

  selectedFilter: HistoryFilter = 'all';

  constructor(
    private sleepService: SleepService,
    private alertController: AlertController
  ) {
    addIcons({
      moonOutline,
      sunnyOutline,
      timeOutline,
      calendarOutline,
      trashOutline
    });
  }

  get overnightCount(): number {
    return SleepService.AllOvernightData.length;
  }

  get sleepinessCount(): number {
    return SleepService.AllSleepinessData.length;
  }

  get totalCount(): number {
    return SleepService.AllSleepData.length;
  }

  get filteredRecords(): SleepData[] {
    let records: SleepData[];

    switch (this.selectedFilter) {
      case 'overnight':
        records = SleepService.AllOvernightData;
        break;

      case 'sleepiness':
        records = SleepService.AllSleepinessData;
        break;

      default:
        records = SleepService.AllSleepData;
        break;
    }

    return [...records].reverse();
  }

  setFilter(filter: HistoryFilter): void {
    this.selectedFilter = filter;
  }

  isOvernight(record: SleepData): boolean {
    return record instanceof OvernightSleepData;
  }

  isSleepiness(record: SleepData): boolean {
    return record instanceof StanfordSleepinessData;
  }

  getRecordTitle(record: SleepData): string {
    if (this.isOvernight(record)) {
      return 'Overnight Sleep';
    }

    if (this.isSleepiness(record)) {
      return 'Daytime Sleepiness';
    }

    return 'Sleep Record';
  }

  getRecordSummary(record: SleepData): string {
    return record.summaryString();
  }

  getRecordDate(record: SleepData): string {
    return record.dateString();
  }

  // Confirm before deleting a saved record
  async confirmDelete(record: SleepData): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Sleep Record?',
      message:
        'Are you sure you want to delete this record? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.sleepService.deleteSleepData(record.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
