import { AfterViewInit, ChangeDetectionStrategy, Component, input, OnInit, output, signal, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { NgFor, NgIf } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, MatSortModule, MatPaginatorModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnInit, AfterViewInit{
  users = input.required<User[]>();
  userDblClicked = output<User>();
  sort = viewChild(MatSort);
  dataSource: WritableSignal<MatTableDataSource<User>> = signal(new MatTableDataSource([]));
  readonly displayedColumns: (keyof User)[] = ['name', 'phone', 'email', 'website'];

  ngOnInit(): void {
    this.dataSource().data = this.users();
  }

  ngAfterViewInit(): void {
    this.dataSource().sort = this.sort();
  }

  onUserDblClick(user: User): void {
    this.userDblClicked.emit(user);
  }
}
