import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-step-description',
  standalone: true,
  imports: [CommonModule, MatDivider],
  templateUrl: './step-description.html',
  styleUrls: ['./step-description.scss'],
})
export class StepDescriptionComponent {
  @Input() title!: string;
  @Input() description!: string;
}
