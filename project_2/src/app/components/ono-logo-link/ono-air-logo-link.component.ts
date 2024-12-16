import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'ono-logo-link',
  templateUrl: './ono-logo-link.component.html',
  styleUrls: ['./ono-logo-link.component.scss'],
  imports: [RouterLink, NgOptimizedImage],
  standalone: true,
})
export class OnoLogoLinkComponent {}
