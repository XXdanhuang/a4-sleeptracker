
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

  selectedFilter: HistoryFilter = 'all';

  constructor(private sleepService: SleepService) {

    addIcons({
      moonOutline,
      sunnyOutline,
      timeOutline,
      calendarOutline
    });

  }

  // Number of overnight sleep records
  get overnightCount(): number {
    return SleepService.AllOvernightData.length;
  }

  // Number of daytime sleepiness records
  get sleepinessCount(): number {
    return SleepService.AllSleepinessData.length;
  }

  // Total number of sleep records
  get totalCount(): number {
    return SleepService.AllSleepData.length;
  }

  // Filter sleep records by selected category
  get filteredRecords(): SleepData[] {

    let records: SleepData[];

    if (this.selectedFilter === 'overnight') {

      records = SleepService.AllOvernightData;

    } else if (this.selectedFilter === 'sleepiness') {

      records = SleepService.AllSleepinessData;

    } else {

      records = SleepService.AllSleepData;

    }

    // Show recently added records first
    return [...records].reverse();
  }

  // Change selected filter
  setFilter(filter: HistoryFilter): void {
    this.selectedFilter = filter;
  }

  // Check whether record is overnight sleep
  isOvernight(record: SleepData): boolean {
    return record instanceof OvernightSleepData;
  }

  // Check whether record is daytime sleepiness
  isSleepiness(record: SleepData): boolean {
    return record instanceof StanfordSleepinessData;
  }

  // Get record title
  getRecordTitle(record: SleepData): string {

    if (this.isOvernight(record)) {
      return 'Overnight Sleep';
    }

    if (this.isSleepiness(record)) {
      return 'Daytime Sleepiness';
    }

    return 'Sleep Record';
  }

  // Get record summary
  getRecordSummary(record: SleepData): string {
    return record.summaryString();
  }

  // Get record date
  getRecordDate(record: SleepData): string {
    return record.dateString();
  }

}
