import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerService } from './server.serivce';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Data Refresh';

  isMenuOpen = true;
  contentMargin = 240;
  showIntro : Boolean = true;

  displayColumnDB2 : string[] = ['app_code', 'app_desc', 'grid', 'database_name', 'table_name', 'table_space', 'prod', 'et', 'st', 'mask_scope', 'subset_scope'];
  displayColumnFF : string[] = ['app_code', 'app_desc', 'grid', 'file_name','version', 'prod', 'et', 'st', 'mask_scope', 'subset_scope'];
  displayColumnIMS : string[] = ['app_code', 'app_desc', 'grid', 'database_name', 'prod', 'et', 'st', 'mask_scope', 'subset_scope'];
  displayColumnLOG : string[] = ['userId', 'updatedTime', 'updatedCol', 'updatedValue', 'oldValue', 'app_desc', 'app_code', 'ds_type', 'ds_name', 'table_space', 'table_name'];

  constructor(private serverService : ServerService){};

  onSidenavItemClick(tabtype : String){
     if(tabtype == "Introduction"){
      this.showIntro = true;
      this.serverService.dbType = tabtype;
    }
    else{
      this.serverService.filterProd = 'All';
      this.serverService.filterET = 'All';
      this.serverService.filterST = 'All';

      console.log(tabtype);
      this.showIntro = false;
      this.serverService.dbType = tabtype;
      if(this.serverService.dbType=='DB2'){
          this.serverService.displayedColumns = this.displayColumnDB2;
      }
      else if(this.serverService.dbType=='FF'){
        this.serverService.displayedColumns = this.displayColumnFF;
      }
      else if(this.serverService.dbType=='IMS'){
        this.serverService.displayedColumns = this.displayColumnIMS;
      }
      else{
        this.serverService.displayedColumns = this.displayColumnLOG;
      }
      
      if(this.serverService.dbType!="LOG"){
        this.serverService.sendFetchReq(this.serverService.searchText, this.serverService.searchColumn, tabtype);
      }
      else{
        this.serverService.sendFetchLog();
      }  
    }
  }

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
}
