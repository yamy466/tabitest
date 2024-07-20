import { AfterViewInit, ChangeDetectionStrategy, Component, input, Input, OnDestroy, OnInit, output, signal, viewChild, WritableSignal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { NgFor, NgIf } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, MatSortModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit, AfterViewInit, OnDestroy{
  users = input.required<Observable<User[]>>();
  userDblClicked = output<User>();
  sort = viewChild(MatSort);
  dataSource: WritableSignal<MatTableDataSource<User>> = signal(new MatTableDataSource([]));
  #touchtime = 0;
  #selectedUser: User | undefined = undefined;
  subs: Subscription = new Subscription();
  
  readonly displayedColumns: (keyof User)[] = ['name', 'phone', 'email', 'website'];
  
  ngOnInit(): void {
    this.subs.add(this.users().subscribe(users => this.onUsersChange(users)));
  }
  
  ngAfterViewInit(): void {
    this.dataSource().sort = this.sort();
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onUserClick(user: User): void {
    if (this.#touchtime == 0) {
      // set first click
      this.#touchtime = new Date().getTime();
      this.#selectedUser = user;
    } 
    // check if the click is on the same user
    else if(this.#selectedUser === user ) {
      // compare first click to this click and see if they occurred within double click threshold
      if(((new Date().getTime()) - this.#touchtime) < 500){
        // double click occurred
        this.userDblClicked.emit(user);
        this.#touchtime = 0;
      }
      else {
        // not a double click, set as a new first click
        this.#touchtime = new Date().getTime();
      }
    }
    else this.#touchtime = 0;
  }

  onUsersChange(users: User[]): void {
    this.dataSource().data = users;
  }
}
