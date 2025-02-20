import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaneType, PlaneTypeToInfo } from '../flight-editor.consts';
import {
  HeaderInfoComponent,
  HeaderInfoItem,
} from '../../../../../components/header-info/header-info.component';

@Component({
  selector: 'app-plane-info',
  standalone: true,
  imports: [CommonModule, HeaderInfoComponent],
  templateUrl: './plane-info.component.html',
  styleUrls: ['./plane-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaneInfoComponent {
  @Input() planeType?: PlaneType;

  get planeInfo() {
    return this.planeType ? PlaneTypeToInfo[this.planeType] : null;
  }

  get planeMetrics(): HeaderInfoItem[] {
    if (!this.planeInfo) return [];

    return [
      {
        title: 'Origin',
        value: String(this.planeInfo.countryOfOrigin),
      },
      {
        title: 'Top Speed (Knots)',
        value: String(this.planeInfo.topSpeed),
      },
      {
        title: 'Seats',
        value: String(this.planeInfo.seatCount),
      },
      {
        title: 'Size',
        value: this.planeInfo.size,
      },
    ];
  }
}
