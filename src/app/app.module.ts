import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule, MatExpansionModule, MatRippleModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { ServerService } from './server.serivce';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateBatchComponent } from './search/update-batch/update-batch.component';
import { LogsComponent } from './logs/logs.component';

const appRoutes: Routes = [
  {path: 'db2', component: SearchComponent},
  {path: 'ff', component: SearchComponent},
  {path: 'ims', component: SearchComponent},
  {path: 'logs', component: LogsComponent},
  {path: '**', redirectTo: 'db2'}
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DropDownDirective,
    UpdateBatchComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MaterialModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule, 
    MatFormFieldModule,
    MatButtonToggleModule,
    MatExpansionModule, 
    MatRippleModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [ServerService],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateBatchComponent
  ]
})
export class AppModule { }
