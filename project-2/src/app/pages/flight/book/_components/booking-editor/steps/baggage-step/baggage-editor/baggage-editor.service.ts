import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from '../../../../../../../../components/toast/toast.service';
import Passenger from '../../../../../../../../models/passenger.model';
import {
  BAGGAGE_LIMIT_IN_TOTAL,
  BAGGAGE_LIMIT_PER_PASSENGER,
} from './components/baggage-counter/baggage-counter.component.const';

export interface EditorState {
  small: number;
  medium: number;
  large: number;
}

@Injectable({
  providedIn: 'root',
})
export class BaggageEditorService {
  private history = new Map<string, EditorState>();

  constructor(private toastService: ToastService) {}

  /** Validate and update baggage count */
  validate(
    seatCurrentPassengerId: string,
    form: FormGroup,
    passengers: Passenger[]
  ): boolean {
    if (!seatCurrentPassengerId) return false;

    const small = Number(form.get('small')?.value ?? 0);
    const medium = Number(form.get('medium')?.value ?? 0);
    const large = Number(form.get('large')?.value ?? 0);

    const passengerBaggageCount = small + medium + large;

    // Check per-passenger limit
    if (passengerBaggageCount > BAGGAGE_LIMIT_PER_PASSENGER) {
      this.showErrorToast(
        'perPassengerLimit',
        `Max ${BAGGAGE_LIMIT_PER_PASSENGER} baggage items per passenger.`
      );
      this.rollback(seatCurrentPassengerId, form);
      return false;
    }

    const totalBaggageCount = this.getTotalBaggageCount(passengers) + 1;
    if (totalBaggageCount > BAGGAGE_LIMIT_IN_TOTAL) {
      this.showErrorToast(
        'totalLimit',
        `Max ${BAGGAGE_LIMIT_IN_TOTAL} baggage items in total.`
      );
      this.rollback(seatCurrentPassengerId, form);
      return false;
    }

    this.updateHistory(seatCurrentPassengerId, { large, small, medium });
    return true;
  }

  /** Calculate total baggage count across all passengers */
  private getTotalBaggageCount(passengers: Passenger[]): number {
    return passengers.reduce(
      (total, summary) => total + summary.baggage.length,
      0
    );
  }

  /** Show error toast */
  private showErrorToast(errorKey: string, message: string) {
    this.toastService.add({
      id: errorKey,
      title: 'Baggage Limit Reached',
      description: message,
      variant: 'warning',
    });
  }

  private updateHistory(id: string, state: EditorState) {
    this.history.set(id, state);
  }

  private rollback(id: string, form: FormGroup) {
    if (this.history.has(id)) {
      const value = this.history.get(id)!;
      form.patchValue(value);
    }
  }
}
