import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageComponent } from '../../components/page/page.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ono-flight-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  imports: [MatCardModule, MatExpansionModule, PageComponent, MatIcon],
  standalone: true,
})
export class HelpComponent {}
