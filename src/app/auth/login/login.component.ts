import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
         Validators.required,
        ]       
      ],
    })
  }

  login(){
    this._authService.login(this.loginForm.value).subscribe(
      response => {
        if(response){
          if(response.token){
            this._authService.setToken(response.token);
            this._authService.setIdentity(response.user);
            this.router.navigateByUrl('/')
          }
        }
      }
    )
  }

}
