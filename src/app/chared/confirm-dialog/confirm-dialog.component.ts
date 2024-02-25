
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";


import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,

  MatDatepickerToggle
} from "@angular/material/datepicker";
import {  MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, JsonPipe, NgFor, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableModule
} from "@angular/material/table";

import {MatTabHeader} from "@angular/material/tabs";
import {MatSortHeader} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {Student} from "../../Model/student";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-confirm-dialog',
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
    DatePipe, JsonPipe, NgSwitch, NgIf, NgSwitchCase, NgFor, MatCheckbox, MatDialogActions, MatDialogContent, MatToolbar, ReactiveFormsModule,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    school: ['', Validators.required],
    class: ['', Validators.required],
    year: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,

    private matDialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public student: Student
  ) {
    // Populate the form with received data
    this.form.patchValue(student);
  }

  saveHandler(): void {
    // close the modal passing the updated form value
    this.matDialog.close(this.form.value);
  }

}
