import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditorComponent implements OnInit {
  readonly #userSrv = inject(UserService);
  readonly #urlRegex = 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)';
  readonly #phoneRegex = '^0(2|3|4|8|9|7[1-46-9]|5[0-578])[\.-:]?([2-9][0-9]{6})$';
  user = toSignal(this.#userSrv.userToEdit$);
  isNewUser = signal(true);

  userForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.#phoneRegex)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    website: new FormControl('', Validators.pattern(RegExp(this.#urlRegex)))
  });

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    const userDetails = this.user();
    if(userDetails) {
      this.userForm.controls['name'].setValue(userDetails.name);
      this.userForm.controls['email'].setValue(userDetails.email);
      this.userForm.controls['website'].setValue(userDetails.website);
      this.userForm.controls['phone'].setValue(userDetails.phone);
      this.userForm.controls['email'].disable();
      this.isNewUser.set(false)
    }
    else this.isNewUser.set(true);
  }

  closeEditor() {
    this.#userSrv.closeUserEditor();
  }

  submitUser() {
    const userDetails = this.userForm.value as User;
    this.isNewUser() ? this.#userSrv.createUser(userDetails) : this.#userSrv.editUser(userDetails);
  }
}
