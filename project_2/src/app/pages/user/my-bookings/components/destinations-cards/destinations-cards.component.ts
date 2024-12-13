import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { NgForOf } from '@angular/common';
import { BookingItem } from './destinations-cards.component.types';

@Component({
  selector: 'app-destinations-cards',
  templateUrl: './destinations-cards.component.html',
  styleUrls: ['./destinations-cards.component.scss'],
  standalone: true,
  imports: [MatIcon, RouterLink, MatIconButton, MatCard, NgForOf],
})
export class DestinationsCardsComponent {
  @Input() bookings!: BookingItem[];
}
