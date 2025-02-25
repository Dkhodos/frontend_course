import { Component, Input, inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-percentage-selector',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSliderModule, CommonModule],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }],
  templateUrl: './form-percentage-selector.component.html',
  styleUrls: ['./form-percentage-selector.component.scss']
})
export class FormPercentageSelectorComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() id?: string;
  @Input() required = false;
  @Input() errorMessages?: Record<string, string>;

  protected parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get sliderControl(): FormControl {
    return this.parentFormGroup.get(this.controlKey) as FormControl;
  }

  get sliderId(): string {
    return this.id ?? `slider-${this.controlKey}`;
  }

  get errorMessage(): string {
    const control = this.sliderControl;
    if (!control || !control.errors) return '';
    for (const errorKey in control.errors) {
      if (this.errorMessages && this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey];
      }
    }
    return '';
  }

  ngOnInit(): void {
    if (!this.parentFormGroup.get(this.controlKey)) {
      // Initialize with 0 (or any default between 0 and 100)
      this.parentFormGroup.addControl(this.controlKey, new FormControl(0));
    }
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup.get(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
