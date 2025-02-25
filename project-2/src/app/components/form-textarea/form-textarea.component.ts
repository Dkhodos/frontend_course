import { Component, Input, inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form-textarea',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatIcon],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }],
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements OnInit, OnDestroy {
  @Input({ required: true }) public controlKey = '';
  @Input() public label = '';
  @Input() public id?: string;
  @Input() public required = false;
  @Input() public placeholder = '';
  @Input() public errorMessages?: Record<string, string>;
  @Input() public adornmentStart?: string;
  @Input() public adornmentEnd?: string;

  protected parentContainer = inject(ControlContainer);

  public get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  public get textareaControl(): FormControl {
    return this.parentFormGroup.get(this.controlKey) as FormControl;
  }

  public get inputId(): string {
    return this.id ?? `textarea-${this.controlKey}`;
  }

  public get errorMessage(): string {
    const control = this.textareaControl;
    if (!control || !control.errors) return '';
    for (const errorKey in control.errors) {
      if (this.errorMessages && this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey];
      }
    }
    return '';
  }

  public ngOnInit(): void {
    if (!this.parentFormGroup.get(this.controlKey)) {
      this.parentFormGroup.addControl(this.controlKey, new FormControl(''));
    }
  }

  public ngOnDestroy(): void {
    if (this.parentFormGroup.get(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
