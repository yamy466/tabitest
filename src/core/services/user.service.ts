import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { SessionService } from './session.service';
import { SessionKeys } from '../models/session.model';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly #usersUrl = environment.serverUrl + 'users';
  readonly #http = inject(HttpClient);
  readonly #sessionSrv = inject(SessionService);
  readonly #users = new BehaviorSubject<User[]>([]);
  readonly users$ = this.#users .asObservable();

  readonly #isEditorOpen = new BehaviorSubject<boolean>(false);
  readonly isEditorOpen$ = this.#isEditorOpen.asObservable();

  readonly #userToEdit = new BehaviorSubject<User | undefined>(undefined);
  readonly userToEdit$ = this.#userToEdit.asObservable();

  loadUsers(): Observable<User[]> {
    const userList = this.getCurrentUsersList();
    return userList && userList.length > 0 ? of(this.getCurrentUsersList()).pipe(tap(() => this.onUserListUpdate(userList))) : this.getUsers();
  }

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#usersUrl).pipe(tap((users: User[]) => this.onUserListUpdate(users)));
  }

  getCurrentUsersList(): User[] {
    return this.#sessionSrv.getSession(SessionKeys.Users) as User[];
  }

  editUser(user: Partial<User>) {
    const userList = this.getCurrentUsersList();
    const currentUserIndex = userList.findIndex(u => u.id === user.id);
    if(currentUserIndex !== -1) {
      const updatedUser = { ...userList[currentUserIndex], ...user};
      userList[currentUserIndex] = updatedUser;
      this.onUserListUpdate(userList);
    }
  }

  createUser(user: User) {
    const userList = this.getCurrentUsersList();
    user.id = uuid.v4();
    userList.push(user);
    this.onUserListUpdate(userList);
  }

  deleteUser(userId: string) {
    const userList = this.getCurrentUsersList();
    const currentUserIndex = userList.findIndex(u => u.id === userId);
    if(currentUserIndex !== -1) {
      userList.splice(currentUserIndex, 1);
      this.onUserListUpdate(userList);
    }
  }

  openUserEditor(user?: User) {
    this.#userToEdit.next(user);
    this.#isEditorOpen.next(true);
  }

  closeUserEditor() {
    this.#isEditorOpen.next(false);
    this.#userToEdit.next(undefined);
  }

  private onUserListUpdate(users: User[]) {
    const updatedUsers = users ?? [];
    this.#users.next(updatedUsers);
    this.#sessionSrv.setSession(SessionKeys.Users, updatedUsers);
  }
}
