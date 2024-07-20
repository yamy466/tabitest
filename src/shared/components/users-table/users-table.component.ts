import { ChangeDetectionStrategy, Component, input, output, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from '../../models/user.model';
import { NgFor, NgIf } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, MatSortModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent {
  users = input.required<User[]>();
  userDblClicked = output<User>();
  readonly displayedColumns: (keyof User)[] = ['name', 'phone', 'email', 'website'];
  @ViewChild(MatSort) sort: MatSort;
  dataSource: WritableSignal<MatTableDataSource<User>> = signal(new MatTableDataSource([]));

  ngOnInit(): void {
    this.dataSource().data = this.users();
  }

  ngAfterViewInit() {
    this.dataSource().sort = this.sort;
  }
}
