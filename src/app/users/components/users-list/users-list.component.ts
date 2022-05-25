import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public status!:string;
  public users!: User[];

  public limit:number = 20;
  public page:number = 1;

  public noMoreUsers:boolean = false;
  constructor(
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers(this.limit, this.page);
  }

  getUsers(limit:number, page:number, push = false){
    this._userService.getUsers(limit, page).subscribe(
      response => {
        if(response.users){
          if(push){
            this.users.push(...response.users);
          }else {
            this.users = response.users;
          }

          if(response.users.length < this.limit){
            this.noMoreUsers = true;
          }
          
          this.status = 'success';
        } else {
          this.status = 'error'
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    )
  }

  loadMore(){
    this.page++;
    this.getUsers(this.limit, this.page, true);
  }
  
  onUserDeleted(event:any):void{
    const userDeleted:User = event.user;

    this.users = this.users.filter(user => user._id !== userDeleted._id);

  }
  
}