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

  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.#usersUrl).pipe(tap((users: User[]) => this.#users.next(users ?? [])));
  }
}
