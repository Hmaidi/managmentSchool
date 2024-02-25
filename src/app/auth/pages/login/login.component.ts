import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
 import {ActivatedRoute, Router} from '@angular/router';
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

import {first} from "rxjs";
import { AuthService} from "../auth.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SchoolServiceService} from "../../../services/school-service.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loginUserData = { };

  private signinForm: any;
  constructor(      private formBuilder: FormBuilder,
                     private authService:AuthService,
                    public fb: FormBuilder,
                   private  snackbarService:SchoolServiceService,
                    public router: Router
                    ) {

  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


/*  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value,  this.loginForm.value)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
          error => {
          this.error = error;
          this.loading = false;
        });
  }*/

  onSubmit() {

    this.authService.UserLogin(this.loginForm.value)
      .subscribe((res)=> {

          if(this.loginForm?.value?.password==res.password && this.loginForm?.value?.username==res.username )
          {
            localStorage.setItem('access_token', res.token);
            this.router.navigate(['/students']);
          }
          else {
            this.snackbarService.openSnackBar('User name or Password incorrect ');
          }
        }

      );



  }
}
