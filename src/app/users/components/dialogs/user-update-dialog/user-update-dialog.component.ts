import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
})
export class UserUpdateDialog implements OnInit {

  public userUpdateForm!: FormGroup;
  public user: User;

  public errors:any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private dialogRef: MatDialogRef<UserUpdateDialog>
  ) {
    this.user = data.user;
    
    this.userUpdateForm = this.formBuilder.group({
      _id: [
        '',
        [
          Validators.required
        ]
      ],
      name: [
        '',
        [
          Validators.required
        ]
      ],
      surname: [
        '',
        [
          Validators.required
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    })
  }

  ngOnInit(): void {
    this.userUpdateForm.patchValue(this.user);
  }

  userUpdate(){
    this.userUpdateForm.value._id = this.user._id;
    this._userService.updateUser(this.user._id,this.userUpdateForm.value).subscribe(
      response => {
        if(response.user){
          this.user = response.user;

          this.dialogRef.close({ data: {user:this.user} })
        }
      },
      error => {
        // console.log(error)
        this.errors = error.error.errors;
      }
    )
  }

}
