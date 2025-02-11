import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../components/page/page.component';
import { FlightsService } from '../../../services/flights-async.service';
import { FlightEditorComponent } from '../_components/flight-editor/flight-editor.component';

@Component({
  selector: 'ono-flight-add',
  templateUrl: 'flight-add.component.html',
  styleUrls: ['flight-add.component.scss'],
  standalone: true,
  imports: [PageComponent, CommonModule, FlightEditorComponent],
})
export class FlightAddPageComponent {
  constructor(private flightsService: FlightsService) {}
}
