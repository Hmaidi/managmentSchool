import { Routes } from '@angular/router';

import {LoginComponent} from "./auth/pages/login/login.component";
import {AuthService} from "./auth/pages/auth.service";
import {inject} from "@angular/core";
import {StudentsComponent} from "./students/students.component";
import {AuthGuard} from "./auth/pages/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    redirectTo:'login', pathMatch:'full'

  },
  {
    path: 'students',
    component: StudentsComponent,
  //  canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },



];
