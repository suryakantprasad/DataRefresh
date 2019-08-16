import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';


export interface SearchResult {
    app_code: string;
    app_desc: string;
    grid: string;
    database_name: string;
    table_space: string;
    table_name: string;
    prod: string;
    et: string;
    st: string;
    mask_scope: string;
    subset_scope: string;
    version : string;
  }

@Injectable()
export class ServerService{

    fetchResults : any = [];
    logResults : any;
    ColumnFieldValues : any;
    dbType : String = 'Introduction';
    filterProd : String = 'All';
    filterET : String = 'All';
    filterST : String = 'All';
    searchText : String ='AA';
    searchColumn : String='APP_CODE';
    searchResult : SearchResult[] = [];
    displayedColumns: string[] = [];
    searchResultDataSource = new MatTableDataSource<SearchResult>(this.searchResult);

    constructor( private http : HttpClient){}

    sendFetchReq(searchText : String, searchcolumn : String, dbType : String){
        const fetch = {"searchKey" : searchText, "columnKey" : searchcolumn, "tabType" : dbType};
        this.searchText = searchText;
        this.searchColumn = searchcolumn;

        this.http.post("http://vm00004104:9090/DataRefreshServer/apiRepos/api/getData", fetch)
        .subscribe(
            response => {
                console.log(response);
                this.fetchResults = response;
            },
            err=>console.log(err),
            ()=>{
                console.log("something");
                console.log(this.fetchResults);
                // if(this.fetchResults==null){
                //     Swal.fire({
                //         type: 'error',
                //         title: 'Oops...',
                //         text: 'Data not found',
                //       });
                //       this.searchResultDataSource.data = null;
                // }
                // else if(this.fetchResults==undefined){
                //     Swal.fire({
                //         type: 'error',
                //         title: 'Oops...',
                //         text: 'Data not found',
                //     });
                // }
                // else if(this.fetchResults==[]){
                //     Swal.fire({
                //         type: 'error',
                //         title: 'Oops...',
                //         text: 'Data not found',
                //       });
                //     this.searchResultDataSource.data = null;
                // }
                if(this.fetchResults.length==0){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Data not found',
                      });
                      this.searchResultDataSource.data = [];
                }
                else {
                    this.searchResultDataSource.data = this.fetchResults;
                    console.log(this.searchResultDataSource.data);
                }
                // else{
                //     Swal.fire({
                //         type: 'error',
                //         title: 'Oops...',
                //         text: 'Data not found',
                //         });
                //     this.searchResultDataSource.data = null;
                // }
            });
        
    }
    
    updateRow(tabType : String, appdesc : String, appCode : String, databaseName : String, tableName : String, tableSpace : String, updatedColumn : String, updatedValue : String, grid : String){
        const updateSingleRow = {"tabType" : tabType, "appdesc" : appdesc, "appCode" : appCode, "databaseName" : databaseName,
        "dsType" : this.dbType, "tableName" : tableName, "tableSpace" : tableSpace,
        "updatedColumn" : updatedColumn, "updatedValue" : updatedValue,  "grid" : grid};

        console.log(updateSingleRow);

        this.http.post("http://vm00004104:9090/DataRefreshServer/apiRepos/api/updateRow", updateSingleRow)
        .subscribe(
            response => {
                console.log(response);
            });
    }

    sendFilterReq(searchText : String, filterBy : String, columnSelected : String, searchColumn : String){
        const filter = {"tabName" : this.dbType, "columnSelected" : columnSelected, "filterBy" : filterBy, "searchText" : searchText, "searchColumn" : searchColumn};
        console.log(filter);
        this.http.post("http://vm00004104:9090/DataRefreshServer/apiRepos/api/filterData", filter)
        .subscribe(
            response => {
                console.log(response);
                this.fetchResults = response;
                if(this.fetchResults.length==0){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Data not found',
                      });
                    this.searchResultDataSource.data = null;
                }
                else{
                    this.searchResultDataSource.data = this.fetchResults;
                    console.log(this.searchResultDataSource.data);
                }
            });
        
    }

    getDropDownData(columnName : String){
        const dropDownDataReq = {"tabType" : this.dbType, "columnName" : columnName};

        this.http.post("http://vm00004104:9090/DataRefreshServer/apiRepos/api/getDropdownData", dropDownDataReq)
        .subscribe(
            response => {
                console.log(response);
                this.ColumnFieldValues = response;
                if(this.ColumnFieldValues.length==0){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Data not found',
                      })
                }
            });
    }

    updateBatch(updateBasis : String, updateBasisValue : String, environments : String[], newValue : String){

        const updateBatchRow = {"tabType" : this.dbType,"updateBasis" : updateBasis , "updateBasisValue" : updateBasisValue, "environments" : environments, "newValue" : newValue};

        this.http.post("http://vm00004104:9090/DataRefreshServer/apiRepos/api/updateRowBatch", updateBatchRow)
        .subscribe(
            response => {
                console.log(response);
                // this.fetchResults = this.sendFetchReq(this.searchText, this.searchColumn, this.dbType);
            },
            (error)=>console.log(error),
            ()=>{
                this.fetchResults = this.sendFetchReq(this.searchText, this.searchColumn, this.dbType);
            });

    }

    sendFetchLog(){
        this.http.get("http://vm00004104:9090/DataRefreshServer/apiRepos/api/getLog")
        .subscribe(
            response=>{
                this.logResults = response;
                if(this.logResults.length==0){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Data not found',
                      })
                    this.searchResultDataSource.data = null;
                }
                else{
                    this.searchResultDataSource.data = this.logResults;
                    console.log(this.searchResultDataSource.data);
                }
            }
        );
    }
}