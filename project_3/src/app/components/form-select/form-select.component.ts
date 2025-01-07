import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class FormSelectComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() id?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() options: Option[] = [];

  // Accept custom error messages mapping error keys to messages
  @Input() errorMessages?: Record<string, string>;

  @Input() errorStateMatcher?: ErrorStateMatcher;

  protected parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get selectControl(): FormControl {
    return this.parentFormGroup.get(this.controlKey) as FormControl;
  }

  get selectId(): string {
    return this.id ?? `select-${this.controlKey}`;
  }

  get effectiveErrorStateMatcher(): ErrorStateMatcher {
    return this.errorStateMatcher ?? new ShowOnDirtyErrorStateMatcher();
  }

  get hasError(): boolean {
    const control = this.selectControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

  get errorMessage(): string {
    const control = this.selectControl;
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
      this.parentFormGroup.addControl(this.controlKey, new FormControl(''));
    }
  }

  ngOnDestroy(): void {
    if (this.parentFormGroup.get(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
