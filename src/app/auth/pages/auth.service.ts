import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from "../../Model/student";
const users: User[] = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private UrlRegister = 'http://localhost:3000/api/register';
  private UrLogin = 'http://localhost:3000/api/login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor( private http: HttpClient, private routerSrvice: Router,@Inject('APIREQRES') public Apiurl:string) { }


  UserLogin(userObjet:any) {

    return this.http.post<any>(this.UrLogin, userObjet);

  }
  Islogin(): boolean {
  return !!localStorage.getItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
    //return true;
  }


}
