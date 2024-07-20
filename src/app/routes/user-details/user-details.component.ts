import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersTableComponent } from '../../../shared/components/users-table/users-table.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent {
  readonly #userSrv = inject(UserService);
  users = toSignal<User[]>(this.#userSrv.users$);
}
