import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../../../../../models/flight.model';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-flight-information',
  standalone: true,
  imports: [CommonModule, MatDivider],
  templateUrl: './flight-information.html',
  styleUrls: ['./flight-information.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FlightInformationComponent {
  @Input() flight!: Flight;
}
