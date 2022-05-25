import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserDetailDialog } from '../dialogs/user-detail-dialog/user-detail-dialog.component';
import { UserUpdateDialog } from '../dialogs/user-update-dialog/user-update-dialog.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user!: User;
  @Output() onDeleted = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    
  ) {}

  ngOnInit(): void {
  }

  modalUserDetail() {
    const dialogRef = this.dialog.open(UserDetailDialog, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.openUpdateUserModal){
        this.modalUserUpdate();
      } else if(data?.deleteUser){
        this.deleteUser();
      }
  
    });
  }

  modalUserUpdate() {
    const dialogRef = this.dialog.open(UserUpdateDialog, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe(result => {
      const data = result?.data;

      if(data?.user) this.user = data.user;
    });
  }

  deleteUser(){
    this._userService.deleteUser(this.user._id).subscribe(
      response => {
        if(response){
          this.onDeleted.emit(response);
        }
      }
    )
  }

}