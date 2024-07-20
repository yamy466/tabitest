import { Component, EventEmitter, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'menu-close-btn',
  imports: [CommonModule],
  templateUrl: './menu-close-btn.component.html',
  styleUrls: ['./menu-close-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class MenuCloseBtnComponent {
  isOpen = input(false);
  visibilityChanged = output<boolean>();

  changeVisibility() {
    this.visibilityChanged.emit(this.isOpen());
  }
}
