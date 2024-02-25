import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SchoolServiceService} from "../../services/school-service.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {JsonPipe, NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [
    JsonPipe,NgIf,NgFor
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css'
})
export class ViewDetailsComponent implements OnInit{
  dataSearch:any
  constructor(
    private matDialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  private schoolService: SchoolServiceService
  ) {


  }
ngOnInit() {
    this.schoolService.getData().subscribe((res)=>{
          let resp=res[this.data.school].classes[this.data.year]
          let resClass= resp.filter((u:any)=>u.class==this.data.class)
          resClass.forEach((elem:any)=>{
          let result=   elem?.students.filter((u:any)=>u.position==this.data.position)
          this.dataSearch=result[0]
       })


    })
}

  protected readonly Object = Object;
}
