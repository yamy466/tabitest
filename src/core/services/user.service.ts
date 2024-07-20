import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly #usersUrl = environment.serverUrl + 'users';
  readonly #http = inject(HttpClient);
  readonly #users = new BehaviorSubject<User[]>([]);
  readonly users$ = this.#users.asObservable();

  readonly #isEditorOpen = new BehaviorSubject<boolean>(false);
  readonly isEditorOpen$ = this.#isEditorOpen.asObservable();

  readonly #userToEdit = new BehaviorSubject<User | undefined>(undefined);
  readonly userToEdit$ = this.#userToEdit.asObservable();

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#usersUrl).pipe(tap((users: User[]) => this.#users.next(users ?? [])));
  }

  editUser() {

  }

  createUser() {

  }

  openUserEditor(user?: User) {
    this.#userToEdit.next(user);
    this.#isEditorOpen.next(true);
  }

  closeUserEditor() {
    this.#isEditorOpen.next(false);
    this.#userToEdit.next(undefined);
  }
}
