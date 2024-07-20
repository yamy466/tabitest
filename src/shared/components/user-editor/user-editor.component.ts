import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [],
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditorComponent {
  readonly #userSrv = inject(UserService);

  closeEditor() {
    this.#userSrv.closeUserEditor();
  }
}
