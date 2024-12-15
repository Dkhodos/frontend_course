import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundPlaceholderComponent} from '../../components/not-found-placeholder/not-found-placeholder.component';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [CommonModule, NotFoundPlaceholderComponent],
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss'],
})
export class General404PageComponent {}
