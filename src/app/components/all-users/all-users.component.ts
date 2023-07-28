import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Subscription, switchMap, take } from 'rxjs';
import { DataService, DialogService } from 'src/app/services';

import { DialogData, User } from 'src/app/shared';

@Component({
  selector: 'bolt-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.less']
})
export class AllUsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table?: MatTable<User>;
  tableSubscription?: Subscription;
  tableData: User[] = []
  tableColumns: string[] = [];
  selectedUser: User | undefined;
  previousTarget: HTMLElement | null = null;
  isUpdateAction: boolean = false;

  constructor(
    private dialogService: DialogService, private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getUsers().pipe(take(1)).subscribe((users: User[]) => {
      if (users.length) {
        this.tableData = users;
        this.tableColumns = Object.keys(users[0]).filter(key => key !== 'id');
      }
    });

    this.tableSubscription = this.dataService.tableUpdated.subscribe((isUpdated) => {
      if (isUpdated) {
        this.dataService.getUsers().pipe(take(1)).subscribe((users: User[]) => {
          if (users.length) {
            this.tableData.push(users[users.length - 1]);
            this.table?.renderRows();
          }
        });
        this.isUpdateAction = false;
      }
    })
  }

  removeUser(): void {
    if (this.selectedUser) {
      this.dataService.deleteUser(this.selectedUser);
      this.tableData = this.tableData.filter(user => user.id !== this.selectedUser?.id);
      this.table?.renderRows();
    }
    this.isUpdateAction = false;
  }

  refreshTable(): void {
    this.dataService.getUsers().pipe(take(1)).subscribe((users: User[]) => {
      if (users.length) {
        this.tableData = users;
        this.table?.renderRows();
      }
    });
    this.isUpdateAction = false;
  }

  selectRow(user: User, event: Event): void {
    if (this.previousTarget) this.previousTarget.style.backgroundColor = 'white';
    const target = event.target as HTMLTableRowElement;
    this.previousTarget = target.parentElement;
    target.parentElement!.style.backgroundColor = '#9c9da1';
    this.selectedUser = user;
    this.isUpdateAction = true;
  }

  openDialog(action: string) {
    const data: DialogData = {
      action,
      userData: this.selectedUser ?? null
    }
    this.dialogService.openDialog(data);
  }

  ngOnDestroy(): void {
    this.tableSubscription?.unsubscribe();
  }
}
