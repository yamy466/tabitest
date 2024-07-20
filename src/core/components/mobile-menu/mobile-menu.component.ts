import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MenuItem } from '../../models/header.model';
import { MenuService } from '../../services/menu.service';
import { toSignal } from '@angular/core/rxjs-interop';

export const animation = trigger('openClose', [
    transition(':enter', [
        style({ width: 0, opacity: 0.8 }),
        animate('0.4s ease-in', style({ width: '100%', opacity: 1}))
      ]
    ),
    transition(':leave', [
        style({ width: '100%', opacity: 1 }),
        animate('0.4s ease-out', style({ width: 0, opacity: 0.8 }))
      ]
    )
  ]
)

@Component({
  selector: 'mobile-menu',
  imports: [NgIf, NgFor],
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [animation]
})
export class MobileMenuComponent {
  readonly #menuSrv = inject(MenuService); 

  menuItems = this.#menuSrv.menuItems;
  selectedItem = toSignal(this.#menuSrv.selectedItem$);
  isOpen = input(false);

  navigate(item?: MenuItem){
    this.#menuSrv.navigate(item);
  }
}
