import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SchoolServiceService {

  public   dataUrl = 'assets/db.json';
  private data: any;

  constructor(private http: HttpClient,public snackBar: MatSnackBar) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }


  openSnackBar(message: string) {
    this.openSnackBarWithAction(message, 'Close');
  }

  openSnackBarWithAction(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 150000,
    });
  }

}
