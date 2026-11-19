
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
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
  calendarOutline
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

  // Current filter
  selectedFilter: HistoryFilter = 'all';

  constructor(private sleepService: SleepService) {

    // Register icons used in the History page
    addIcons({
      moonOutline,
      sunnyOutline,
      timeOutline,
      calendarOutline
    });

  }

  // Count overnight sleep records
  get overnightCount(): number {
    return SleepService.AllOvernightData.length;
  }

  // Count daytime sleepiness records
  get sleepinessCount(): number {
    return SleepService.AllSleepinessData.length;
  }

  // Count all sleep records
  get totalCount(): number {
    return SleepService.AllSleepData.length;
  }

  // Display records based on the selected filter
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

    // Display the most recently added records first
    return [...records].reverse();
  }

  // Update selected filter
  setFilter(filter: HistoryFilter): void {
    this.selectedFilter = filter;
  }

  // Identify overnight sleep records
  isOvernight(record: SleepData): boolean {
    return record instanceof OvernightSleepData;
  }

  // Identify daytime sleepiness records
  isSleepiness(record: SleepData): boolean {
    return record instanceof StanfordSleepinessData;
  }

  // Display record title
  getRecordTitle(record: SleepData): string {

    if (this.isOvernight(record)) {
      return 'Overnight Sleep';
    }

    if (this.isSleepiness(record)) {
      return 'Daytime Sleepiness';
    }

    return 'Sleep Record';
  }

  // Display record summary
  getRecordSummary(record: SleepData): string {
    return record.summaryString();
  }

  // Display record date
  getRecordDate(record: SleepData): string {
    return record.dateString();
  }

}
