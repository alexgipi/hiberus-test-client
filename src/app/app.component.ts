import { Component, DoCheck, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'test-client';

  currentRoute: string;

  public identity:User | undefined;
  constructor(
    private router: Router,
    private _authService: AuthService
  ) {
    this.currentRoute = "Demo";
    this.identity = this._authService.getIdentity();

    this.router.events.subscribe((event: Event) => {

        if(event instanceof NavigationEnd) {
            this.currentRoute = event.url;
        }

    });

  }

  ngOnInit(){
    
  }

  ngDoCheck(){
    this.identity = this._authService.getIdentity();
  }

  logout(){
    this._authService.logout();
    this.identity = undefined;
    this.router.navigateByUrl('/login')
  }
}
