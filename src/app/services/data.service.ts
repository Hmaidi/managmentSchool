import { Injectable } from '@angular/core';
import {Student} from "../Model/student";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {


  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;



  /** CRUD METHODS */

  addIssue(issue: Student): void {
    this.dialogData = issue;
  }


}
