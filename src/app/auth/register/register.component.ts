import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/custom-validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  public errors:any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
      ],
      password: [
        '',
        [
         Validators.required,
         Validators.minLength(6),
         Validators.maxLength(25),
         CustomValidators.patternValidator(/\d/, { hasNumber: true }),
         CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
         CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true })
        ]       
      ],
      terms: [
        '',
        [
          Validators.required,
          Validators.requiredTrue
        ]
      ],
    })
  }

  register(){
    this._authService.register(this.registerForm.value).subscribe(
      response => {
        if(response){          
            if(response.token){
              this._authService.setToken(response.token);
              this._authService.setIdentity(response.user);
              this.router.navigateByUrl('/')
            }
          
        }
      },
      error => {
        // console.log(error)
        this.errors = error.error.errors;
      }
    )
  }

}
