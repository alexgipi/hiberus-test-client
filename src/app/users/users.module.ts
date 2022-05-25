import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserCardComponent } from './components/user-card/user-card.component';

import { UserDetailDialog } from './components/dialogs/user-detail-dialog/user-detail-dialog.component';
import { UserUpdateDialog } from './components/dialogs/user-update-dialog/user-update-dialog.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { InfiniteScrollModule } from "ngx-infinite-scroll";



@NgModule({
  declarations: [
    UsersListComponent,
    UserCardComponent,
    UserDetailDialog,
    UserUpdateDialog
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    InfiniteScrollModule
  ],
  entryComponents: [
    UserDetailDialog,
    UserUpdateDialog
  ]
})
export class UsersModule { }
