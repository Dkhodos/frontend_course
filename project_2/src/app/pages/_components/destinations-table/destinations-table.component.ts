import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Destination } from '../../../models/destination.model';

@Component({
  selector: 'app-destinations-table',
  templateUrl: './destinations-table.component.html',
  styleUrls: ['./destinations-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterModule],
})
export class DestinationsTableComponent {
  @Input() destinations!: Destination[];
}
