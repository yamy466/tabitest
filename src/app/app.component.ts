import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../core/components/header/header.component";
import { UserEditorComponent } from "../shared/components/user-editor/user-editor.component";
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../core/services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserEditorComponent, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tabitest';
  readonly #userSrv = inject(UserService);

  isEditorOpen = toSignal(this.#userSrv.isEditorOpen$);
}
