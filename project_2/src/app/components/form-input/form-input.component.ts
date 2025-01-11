import {
  Component,
  Input,
  inject,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit, OnDestroy {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() id?: string;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() errorMessages?: Record<string, string>;
  @Input() errorStateMatcher?: ErrorStateMatcher;

  protected parentContainer = inject(ControlContainer);

  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  get inputControl(): FormControl {
    return this.parentFormGroup.get(this.controlKey) as FormControl;
  }

  get inputId(): string {
    return this.id ?? `input-${this.controlKey}`;
  }

  get effectiveErrorStateMatcher(): ErrorStateMatcher {
    return this.errorStateMatcher ?? new ShowOnDirtyErrorStateMatcher();
  }

  get hasError(): boolean {
    const control = this.inputControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

  get errorMessage(): string {
    const control = this.inputControl;
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
