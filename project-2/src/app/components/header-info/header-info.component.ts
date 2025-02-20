import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

export interface HeaderInfoItem {
  title: string;
  value: string;
}

@Component({
  selector: 'app-header-info',
  standalone: true,
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss'],
  imports: [MatDivider, CommonModule],
})
export class HeaderInfoComponent {
  @Input() items: { title: string; value: string }[] = [];
}
