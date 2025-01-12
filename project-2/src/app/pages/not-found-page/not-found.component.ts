import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPlaceholderComponent } from '../../components/not-found-placeholder/not-found-placeholder.component';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule, NotFoundPlaceholderComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundPageComponent {}
