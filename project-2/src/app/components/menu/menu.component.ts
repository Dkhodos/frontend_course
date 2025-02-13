import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

export interface MenuOption {
  title: string;
  value: string;
  link?: string[];
  icon?: string;
  color?: string;
  section?: string; // defaults to "default" if not provided
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    CommonModule,
    MatDivider,
    MatMenuTrigger,
    RouterLink,
  ],
})
export class MenuComponent implements OnChanges {
  @Input() options: MenuOption[] = [];
  @Output() optionClicked = new EventEmitter<MenuOption>();

  groupedOptions: Record<string, MenuOption[]> = {};

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options) {
      this.groupedOptions = this.groupBySection(this.options);
    }
  }

  get sectionKeys(): string[] {
    return Object.keys(this.groupedOptions);
  }

  private groupBySection(options: MenuOption[]): Record<string, MenuOption[]> {
    const groups: Record<string, MenuOption[]> = {};
    options.forEach((option) => {
      const section = option.section ? option.section : 'default';
      if (!groups[section]) {
        groups[section] = [];
      }
      groups[section].push(option);
    });
    return groups;
  }

  onOptionClick(option: MenuOption): void {
    if (option.link) {
      this.router.navigate(option.link);
    } else {
      this.optionClicked.emit(option);
    }
  }
}
