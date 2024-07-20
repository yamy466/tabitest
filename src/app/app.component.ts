import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../core/components/header/header.component";
import { UserEditorComponent } from "../shared/components/user-editor/user-editor.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../core/services/user.service';
import { NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

export const popupAnimation = trigger('openClose', [
  transition(':enter', [
      style({ opacity: 0 }),
      animate('0.4s ease-out', style({ opacity: 1}))
    ]
  ),
  transition(':leave', [
      style({ opacity: 1 }),
      animate('0.4s ease-in', style({ opacity: 0 }))
    ]
  )
]
)

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserEditorComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [popupAnimation]
})
export class AppComponent {
  title = 'tabitest';
  readonly #userSrv = inject(UserService);

  isEditorOpen = toSignal(this.#userSrv.isEditorOpen$);
}
