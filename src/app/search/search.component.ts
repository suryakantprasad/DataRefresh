import { Component, OnInit, OnDestroy, Input, ViewChildren, QueryList, ElementRef, ViewChild} from '@angular/core';
import { ServerService } from '../server.serivce';
import { MatDialog, MatDialogConfig, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UpdateBatchComponent } from './update-batch/update-batch.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import Swal from 'sweetalert2';
import { swalDefaultsProvider } from '@sweetalert2/ngx-sweetalert2/di';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  // searchText : String = "AA";
  // searchColumn : String = "APP_CODE";
  tabType : String;

  pageSize : number = 5;
  pageIndex : number = 0;

  @ViewChildren("prod") prod_dd: QueryList<ElementRef>;
  @ViewChildren("et") et_dd: QueryList<ElementRef>;
  @ViewChildren("st") st_dd: QueryList<ElementRef>;
  @ViewChildren("mask") mask_dd: QueryList<ElementRef>;
  @ViewChildren("subset") subset_dd: QueryList<ElementRef>;
  @ViewChildren("version") version_dd: QueryList<ElementRef>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['app_code', 'app_desc', 'grid', 'database_name', 'table_name', 'table_space', 'version', 'prod', 'et', 'st', 'mask_scope', 'subset_scope'];
  displayedColumns1: string[] = ['app_code', 'app_desc', 'grid', 'database_name', 'version', 'prod', 'et', 'st', 'mask_scope', 'subset_scope'];
  statusVersion: string;
  
  constructor(private serverService : ServerService, private dialog : MatDialog) { }

  statusET : String;
  statusST : String;
  statusPROD : String;
  statusMask : String;
  statusSubset : String;

  env : String = 'Select Env';

  ngOnInit() {
    this.serverService.searchResultDataSource.paginator = this.paginator;
  }


  onSearchColumnOptionClick(searchColumn : String){
    this.serverService.searchColumn = searchColumn;
    this.tabType = this.serverService.dbType;
    console.log(this.tabType);
    this.serverService.sendFetchReq(this.serverService.searchText, this.serverService.searchColumn, this.tabType);
  }

  onChangeStatusFile(newStatus : string, columnName : String, index : number){
    Swal.fire({
      title: 'Are you sure?',
      
      type: 'warning',
      customClass: 'swal-css',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel!'
    }).then((result)=>{
      if(result.value){
        if(columnName === 'prod'){
          this.statusPROD = newStatus;
  
          this.prod_dd.toArray().forEach(el => {
            console.log(el.nativeElement.id+" "+"prod-"+index);
            if(el.nativeElement.id==="prod-"+index){
              const element : HTMLElement = document.getElementById(el.nativeElement.id);
              console.log(element);
              element.innerText = newStatus;
            }
          });
  
          if(this.statusPROD=='Exclude'){
            this.statusET = newStatus;
            this.statusST = newStatus;
  
            this.st_dd.toArray().forEach(el => {
              if(el.nativeElement.id==="st-"+index){
                const element : HTMLElement = document.getElementById(el.nativeElement.id);
                element.innerText = newStatus;
              }
            });
  
            this.et_dd.toArray().forEach(el => {
              if(el.nativeElement.id==="et-"+index){
                const element : HTMLElement = document.getElementById(el.nativeElement.id);
                element.innerText = newStatus;
              }
            });
  
          }
        }
        else if(columnName === 'st'){
          this.statusST = newStatus;
          
          this.st_dd.toArray().forEach(el => {
            if(el.nativeElement.id==="st-"+index){
              const element : HTMLElement = document.getElementById(el.nativeElement.id);
              element.innerText = newStatus;
            }
          });
        }
        else if(columnName === 'et'){
          this.statusET = newStatus;
          
          this.et_dd.toArray().forEach(el => {
            if(el.nativeElement.id==="et-"+index){
              const element : HTMLElement = document.getElementById(el.nativeElement.id);
              element.innerText = newStatus;
            }
          });
        }
        else if(columnName === 'mask'){
          this.statusMask = newStatus;
          
          this.mask_dd.toArray().forEach(el => {
            if(el.nativeElement.id==="mask-"+index){
              const element : HTMLElement = document.getElementById(el.nativeElement.id);
              element.innerText = newStatus;
            }
          });
        }
        else if(columnName === 'subset'){
          this.statusSubset = newStatus;
          
          this.subset_dd.toArray().forEach(el => {
            if(el.nativeElement.id==="subset-"+index){
              const element : HTMLElement = document.getElementById(el.nativeElement.id);
              element.innerText = newStatus;
            }
          });
        }
        else if(columnName === 'version'){
          this.statusVersion = newStatus;
  
          this.version_dd.toArray().forEach(el => {
            if(el.nativeElement.id==="version-"+index){
              const element : HTMLElement = document.getElementById(el.nativeElement.id);
              element.innerText = newStatus;
            }
          });
        }
      }
    })

    console.log(index+this.pageSize*this.pageIndex);
    if(newStatus == 'Exclude' && columnName == 'prod'){
      this.serverService.updateRow(this.serverService.dbType, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_desc
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_code, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].database_name
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_name, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_space, columnName, newStatus, 
        this.serverService.fetchResults[index+this.pageSize*this.pageIndex].grid);
      
      this.serverService.updateRow(this.serverService.dbType, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_desc
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_code, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].database_name
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_name, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_space, "et", newStatus, 
        this.serverService.fetchResults[index+this.pageSize*this.pageIndex].grid);

      this.serverService.updateRow(this.serverService.dbType, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_desc
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_code, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].database_name
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_name, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_space, "st", newStatus, 
        this.serverService.fetchResults[index+this.pageSize*this.pageIndex].grid);
    }
    else{
      this.serverService.updateRow(this.serverService.dbType, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_desc
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].app_code, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].database_name
        , this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_name, this.serverService.fetchResults[index+this.pageSize*this.pageIndex].table_space, columnName, newStatus, 
        this.serverService.fetchResults[index+this.pageSize*this.pageIndex].grid);
    }
  }

  filterResultsBy(columnValue : String, columnName : String){

  console.log(columnValue+" "+columnName);
  if(columnName=='Prod'){
    this.serverService.filterProd = columnValue;
    this.serverService.filterET = 'All';
    this.serverService.filterST = 'All';
  }
  else if(columnName=='ET'){
    this.serverService.filterET = columnValue;
    this.serverService.filterProd = 'All';
    this.serverService.filterST = 'All';
  }
  else if(columnName=='ST'){
    this.serverService.filterST = columnValue;
    this.serverService.filterProd = 'All';
    this.serverService.filterET = 'All';
  }

  this.serverService.sendFilterReq(this.serverService.searchText, columnValue, columnName, this.serverService.searchColumn);
  }
    

  onOpen(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(UpdateBatchComponent, {
      height: '400px',
      width: '400px',
    });
  }

  checkEnter(event){
    this.serverService.sendFetchReq(this.serverService.searchText, this.serverService.searchColumn, this.serverService.dbType);
  }

  onPaginateChange(event){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex=  event.pageIndex;
  }

  // ngOnDestroy() {
  //   this.serverService.searchText = "AA";
  //   this.serverService.searchColumn = "APP_CODE";
  // }

  pickProdGreen(){
    console.log('here1');
    this.prod_dd.toArray().forEach(el => {
      const element : HTMLElement = document.getElementById(el.nativeElement.id);
      if(element.innerText=='Include'){
        return true;
      }
    });
  }

  pickProdRed(){
    console.log('here2');
    this.prod_dd.toArray().forEach(el => {
      const element : HTMLElement = document.getElementById(el.nativeElement.id);
      if(element.innerText=='Exclude'){
        return true;
      }
    });
  }

  pickProdYellow(){

    console.log('here3ng ');
    this.prod_dd.toArray().forEach(el => {
      const element : HTMLElement = document.getElementById(el.nativeElement.id);
      if(element.innerText=='New'){
        return true;
      }
    });
  }
}

