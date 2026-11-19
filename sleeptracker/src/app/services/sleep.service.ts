
import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

// Structure of records saved to localStorage
interface StoredSleepRecord {
  type: 'overnight' | 'sleepiness';
  data: {
    id: string;
    loggedAt: string;
    sleepStart?: string;
    sleepEnd?: string;
    loggedValue?: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private static LoadDefaultData: boolean = true;

  private static readonly STORAGE_KEY = 'sleepTrackerData';

  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor() {
    if (SleepService.LoadDefaultData) {
      SleepService.LoadDefaultData = false;

      // Restore saved records when the app starts.
      // Only load sample data if no saved data exists.
      const hasSavedData = this.loadFromStorage();

      if (!hasSavedData) {
        this.addDefaultData();
      }
    }
  }

  private addDefaultData() {
    var goToBed = new Date();
    goToBed.setDate(goToBed.getDate() - 1);
    goToBed.setHours(1, 3, 0);

    var wakeUp = new Date();
    wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000);

    this.logOvernightData(
      new OvernightSleepData(goToBed, wakeUp)
    );

    var sleepinessDate = new Date();
    sleepinessDate.setDate(sleepinessDate.getDate() - 1);
    sleepinessDate.setHours(14, 38, 0);

    this.logSleepinessData(
      new StanfordSleepinessData(4, sleepinessDate)
    );

    goToBed = new Date();
    goToBed.setDate(goToBed.getDate() - 1);
    goToBed.setHours(23, 11, 0);

    wakeUp = new Date();
    wakeUp.setTime(
      goToBed.getTime() + 9 * 60 * 60 * 1000
    );

    this.logOvernightData(
      new OvernightSleepData(goToBed, wakeUp)
    );
  }

  // Log overnight sleep and save it locally
  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);

    this.saveToStorage();
  }

  // Log daytime sleepiness and save it locally
  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);

    this.saveToStorage();
  }

  // Save both types of sleep data to localStorage
  private saveToStorage() {
    try {
      const records = SleepService.AllSleepData.map(data => ({
        type: data instanceof OvernightSleepData
          ? 'overnight'
          : 'sleepiness',
        data: data
      }));

      localStorage.setItem(
        SleepService.STORAGE_KEY,
        JSON.stringify(records)
      );
    } catch (error) {
      console.error('Failed to save sleep data:', error);
    }
  }

  // Restore previously saved sleep records
  private loadFromStorage(): boolean {
    try {
      const savedData = localStorage.getItem(
        SleepService.STORAGE_KEY
      );

      if (savedData === null) {
        return false;
      }

      const records: StoredSleepRecord[] =
        JSON.parse(savedData);

      if (!Array.isArray(records)) {
        return false;
      }

      for (const record of records) {
        if (!record || !record.data) {
          continue;
        }

        const data = record.data;

        if (
          record.type === 'overnight' &&
          data.sleepStart &&
          data.sleepEnd
        ) {
          const start = new Date(data.sleepStart);
          const end = new Date(data.sleepEnd);
          const loggedAt = new Date(data.loggedAt);

          if (
            Number.isNaN(start.getTime()) ||
            Number.isNaN(end.getTime()) ||
            Number.isNaN(loggedAt.getTime())
          ) {
            continue;
          }

          const overnight = new OvernightSleepData(
            start,
            end
          );

          overnight.id = data.id;
          overnight.loggedAt = loggedAt;

          SleepService.AllOvernightData.push(overnight);
          SleepService.AllSleepData.push(overnight);

        } else if (
          record.type === 'sleepiness' &&
          typeof data.loggedValue === 'number'
        ) {
          const loggedAt = new Date(data.loggedAt);

          if (
            Number.isNaN(loggedAt.getTime()) ||
            !Number.isInteger(data.loggedValue) ||
            data.loggedValue < 1 ||
            data.loggedValue > 7
          ) {
            continue;
          }

          const sleepiness = new StanfordSleepinessData(
            data.loggedValue,
            loggedAt
          );

          sleepiness.id = data.id;

          SleepService.AllSleepinessData.push(sleepiness);
          SleepService.AllSleepData.push(sleepiness);
        }
      }

      return true;

    } catch (error) {
      console.error('Failed to load sleep data:', error);
      return false;
    }
  }

  // Delete a sleep record from memory and localStorage
  public deleteSleepData(id: string): boolean {
    const recordExists = SleepService.AllSleepData.some(
      data => data.id === id
    );

    if (!recordExists) {
      return false;
    }

    SleepService.AllSleepData = SleepService.AllSleepData.filter(
      data => data.id !== id
    );

    SleepService.AllOvernightData = SleepService.AllOvernightData.filter(
      data => data.id !== id
    );

    SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter(
      data => data.id !== id
    );

    this.saveToStorage();

    return true;
  }
}
