
import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {  MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, JsonPipe, NgFor, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {ConfirmDialogComponent} from "../../chared/confirm-dialog/confirm-dialog.component";
import {MatTabHeader} from "@angular/material/tabs";
import {MatSortHeader} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {Student} from "../../Model/student";
import {SchoolServiceService} from "../../services/school-service.service";
import {MatSelect} from "@angular/material/select";
import {MatPaginator} from "@angular/material/paginator";
import {ViewDetailsComponent} from "../../chared/view-details/view-details.component";


@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatHeaderRowDef,
    FormsModule,
    MatColumnDef,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatTabHeader,
    MatHeaderCellDef,
    MatSortHeader,
    MatRowDef,
    MatDatepicker,
    MatIconModule,
    MatDatepickerModule,
    MatIconModule,
    MatCellDef,
    DatePipe, JsonPipe, NgSwitch, NgIf, NgSwitchCase, NgFor, MatCheckbox, MatSelect, MatOption, ReactiveFormsModule,
  ],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css'
})
export class StudentsListComponent implements OnInit {

  selectedSchool: string = 'primary';
  editedRowIndex: number;
  isEdit:boolean=true
  selectedYear: string | null;
  selectedClass:  string | null;
  years: string[] = []
  classes: string[] = []
 displayedColumns: string[] = User
    .filter(col => col.key !== 'isEdit' && col.key!=='position') // Filter out 'isEdit' column
    .map(col => col.key);
  DataToSend: any[] = [];
 dataSourceInitial: any[] = [];
  dataSource: any[];

  constructor(private dialogService: MatDialog, private schoolService: SchoolServiceService) {

  }

  ngOnInit() {
    this.getAllData(this.selectedSchool);
    this.loadYearsAndClasses();
    console.log(this.displayedColumns)
  }

  toggleEditMode(element: any) {
    element.isEdit = !element.isEdit;
  }
  getAllData(selectedSchool:any) {
    this.schoolService.getData().subscribe(data => {
      // Extracting class names for displayed columns
      for (const sectionKey in data) {
        if (data.hasOwnProperty(sectionKey)) {
          const section = data[sectionKey];

          // Iterate over years and classes
          for (const year of section.years) {
            const classes = section.classes[year];

            // Iterate over each class
            for (const classItem of classes) {
              // Iterate over students
              for (const student of classItem?.students) {
                // Create object for each student
                let obj = {
                  position: student.position,
                  school: sectionKey,
                  year: year,
                  class: classItem.class,
                  username: student.username
                };
                // Push object to DataToSend
                this.DataToSend.push(obj);
              }
            }
          }
        }
      }

      // Creating MatTableDataSource
      this.dataSource = this.DataToSend;
      this.dataSourceInitial = this.DataToSend; // Assuming you want to keep an initial copy
    });


  }


  loadYearsAndClasses(): void {
    this.schoolService.getData().subscribe(data => {
      const schoolData = data[this.selectedSchool];
      if (schoolData) {
        this.years = schoolData.years;
        if (this.selectedYear && !this.years.includes(this.selectedYear)) {
          this.selectedYear = null; // Reset selected year if not available
        }
        if (this.selectedClass && !this.classes.includes(this.selectedClass)) {
          this.selectedClass = null; // Reset selected class if not available
        }
        if (this.selectedYear) {
          this.classes = schoolData.classes[this.selectedYear] || [];
        } else {
          this.classes = []; // Reset classes if year is not selected
        }
      }
    });

  }


  editRow(row:any) {

    console.log(row)

  }
  startEditing(index: number) {
    this.isEdit=true;
    this.editedRowIndex = index;
  }
  cancelEditing() {
    this.editedRowIndex = -1;
  }
  saveRow(row: any) {
    // Perform the save operation here, such as making an API call
    console.log('Saving row', row);
    this.editedRowIndex = -1;
  }
  startEdit(element: any) {
    element.editing = true;
  }

  // Function to finish edit mode
  finishEdit(element: any) {
    element.editing = false;
  }
  removeRow(element: number) {
    this.dataSource = this.dataSource.filter((u: any) => u.position !== element);

  }
  ViewDaetails(element:any){

    const dialogRef = this.dialogService.open(ViewDetailsComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe();
  }
    onSchoolChange(selectLevel:any): void {
      this.dataSource = this.dataSourceInitial.filter((u: any) => u.school == selectLevel.value);
      this.loadYearsAndClasses()
  }
  onClassChange(element:any){
    this.dataSource = this.dataSourceInitial.filter((u: any) => u.class == element?.value);

  }
  onYearChange(): void {
    if (this.selectedYear) {
      this.schoolService.getData().subscribe(data => {
        let selectedSchool = this.selectedSchool;
        let selectedYear = this.selectedYear;
        if (selectedSchool && selectedYear) {
          this.classes = data[selectedSchool]?.classes[selectedYear];

        }
      });
    } else {
      this.classes = [];
    }
  }

  addRow() {

    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      data: null,
    });

    // Close Event Handler
    dialogRef.afterClosed().subscribe((student: Student) => {
      if (student) {
        this.addStudent(student);
      }
    });

  }
  addStudent(newUser:Student) {
    let newRow = {
      position: Date.now(),
      username: newUser.username,
      school: newUser.school,
      year: newUser.year,
      class: newUser.class,
      isEdit: true,

    };
   this.dataSource = [newRow, ...this.dataSource];
  }
}
export interface Element {
  position: string;
  username: string;
  class: string;
  year: string;
  school: string;
  isEdit: boolean;
}


export const User = [

  {
    key: 'position',
    type: 'number',
    label: 'Position',

  },
  {
    key: 'username',
    type: 'text',
    label: 'User Name',
  },
  {
    key: 'school',
    type: 'text',
    label: 'School'

  },
  {
    key: 'year',
    type: 'number',
    label: 'Year'
  },
  {
    key: 'class',
    type: 'text',
    label: 'Class'
  },

  {
    key: 'actions',
    type: 'text',
    label: 'Actions',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  }
];
