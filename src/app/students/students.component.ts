import { Component } from '@angular/core';
import {StudentsListComponent} from "./students-list/students-list.component";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    StudentsListComponent
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

}
