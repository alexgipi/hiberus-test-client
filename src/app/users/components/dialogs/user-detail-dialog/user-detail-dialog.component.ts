import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
})
export class UserDetailDialog implements OnInit {
  public user!:User;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private dialogRef: MatDialogRef<UserDetailDialog>
  ) {
    this.user = data.user;
  }

  ngOnInit(): void {
    
  }

  modalUserUpdate() {

    this.dialogRef.close({ data: {openUpdateUserModal:true} })


  }

  deleteUser(){
    this.dialogRef.close({ data: {deleteUser:true} })
  }

  

}
