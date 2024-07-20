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
  readonly #urlRegex = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  readonly #phoneRegex = /^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;
  readonly #englishOnly = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  user = toSignal(this.#userSrv.userToEdit$);
  isNewUser = signal(true);

  userForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(this.#englishOnly)])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.#phoneRegex)])),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    website: new FormControl('', Validators.pattern(this.#urlRegex))
  });

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    const userDetails = this.user();
    if(userDetails) {
      this.userForm.patchValue({ ...userDetails });
      this.userForm.controls['email'].disable();
      this.userForm.controls['email'].clearValidators();
      this.isNewUser.set(false)
    }
    else this.isNewUser.set(true);
  }

  closeEditor() {
    this.#userSrv.closeUserEditor();
  }

  submitUser() {
    if(this.isNewUser()) {
      const userDetails = { ...this.userForm.value } as User;
      this.#userSrv.createUser(userDetails)
    }
    else {
      const userDetails = { ...this.user(), ...this.userForm.value } as User;
      this.#userSrv.editUser(userDetails);
    }
    this.closeEditor();
  }
}
