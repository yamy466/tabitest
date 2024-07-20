import { Component, HostListener, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { BreakpointService } from '../../services/breakpoint.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MenuItem } from '../../models/header.model';
import { MenuService } from '../../services/menu.service';
import { NgFor, NgIf } from '@angular/common';
import { MenuCloseBtnComponent } from '../menu-close-btn/menu-close-btn.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgIf, NgFor, MenuCloseBtnComponent, MobileMenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderComponent {
  readonly #breakpointSrv = inject(BreakpointService);
  readonly #menuSrv = inject(MenuService);

  title = 'Tabitest!';
  isScrolled = signal(false);
  isOpen = this.#menuSrv.isOpen;
  menuItems = this.#menuSrv.menuItems;
  selectedItem = toSignal(this.#menuSrv.selectedItem$);
  isMobile = toSignal(this.#breakpointSrv.isMobile().pipe(tap(() => this.#menuSrv.setIsMenuOpen(false))));
 
  @HostListener('window:scroll', ['$event'])
  onScroll = () => {
    let verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled.set(verticalOffset > 0);
  }

  openSubMenu() {
    this.#menuSrv.setIsMenuOpen(!this.isOpen());
  }

  navigate(item?: MenuItem){
    this.#menuSrv.navigate(item);
  }
}
