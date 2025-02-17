import { Timestamp } from '@angular/fire/firestore';

class DateUtils {
  /**
   * Convert Firestore Timestamp to 'dd-mm-yyyy'.
   */
  fromTimestampToDate(timestamp: Timestamp): string {
    return this.formatDate(timestamp.toDate());
  }

  /**
   * Convert Firestore Timestamp to 'hh:mm'.
   */
  fromTimestampToTime(timestamp: Timestamp): string {
    return this.formatTime(timestamp.toDate());
  }

  /**
   * Convert 'dd-mm-yyyy' and 'hh:mm' to Firestore Timestamp.
   */
  toTimestamp(dateStr: string, timeStr: string): Timestamp {
    const [day, month, year] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return Timestamp.fromDate(new Date(year, month - 1, day, hours, minutes));
  }
  /**
   * Format a Date object to 'dd-mm-yyyy'.
   */
  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  /**
   * Format a Date object to 'hh:mm'.
   */
  public formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  public fromDateStringToDate(dateString: string) {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month), Number(day));
  }
}

export const dateUtils = new DateUtils();
