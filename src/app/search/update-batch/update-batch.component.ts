import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ServerService } from 'src/app/server.serivce';
import Swal from 'sweetalert2';
import { CssSelector } from '@angular/compiler';


@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.css']
})
export class UpdateBatchComponent implements OnInit {

  columnField : String = 'Select Field';
  columnFieldValue : String = 'Select Field';
  onCheckedStatus : String;
  envArr : String[] = [];
  index : number;



  constructor( private dialogRef: MatDialogRef<UpdateBatchComponent>, private serverService : ServerService ) {
    dialogRef.disableClose = true;
   }

  ngOnInit() {
  }

  selectColumnField(columnField : String){
    this.columnField = columnField;
    this.serverService.getDropDownData(this.columnField);
  }

  selectColumnFieldValue(columnFieldValue : String){
    this.columnFieldValue = columnFieldValue;
  }

  onStatusCheck(checkedStatus : String){
    console.log(checkedStatus);
    this.onCheckedStatus = checkedStatus;
  }

  onEnvCheck(event , env : String){
    if(event.target.checked){
      this.envArr.push(env);
    }
    else{
      this.index = this.envArr.indexOf(env);
      if(this.index>0){
        this.envArr.splice(this.index, 1);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  update(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      customClass: 'swal-css',
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel!'
    }).then((results)=>{
      if(results.value){
        this.serverService.updateBatch(this.columnField, this.columnFieldValue, this.envArr, this.onCheckedStatus);
      }
      else{
        Swal.fire({
          type: 'error',
          title: 'Cancel',
          text: 'Update Cancelled',
        })
      }
    })
    
  }
}
