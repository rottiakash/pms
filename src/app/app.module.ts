import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AddComponent } from './components/add/add.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule } from '@angular/material'  
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from '@angular/material/button';
import { ListComponent } from './components/list/list.component';
import { DetailComponentComponent } from './components/detail-component/detail-component.component';
import {MatTabsModule} from '@angular/material/tabs';
import { commService } from './services/comm.service';
import { RecordViewComponent } from './components/record-view/record-view.component';
import { AngularFireStorageModule,StorageBucket } from "@angular/fire/storage";
import { PviewComponent } from './components/pview/pview.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    AddComponent,
    ListComponent,
    DetailComponentComponent,
    RecordViewComponent,
    PviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: "AIzaSyCLQr5E0pntXtGPRRqWz4tA8M6ftmzKVj4",
      authDomain: "patient-medical-system.firebaseapp.com",
      databaseURL: "https://patient-medical-system.firebaseio.com",
      projectId: "patient-medical-system",
      storageBucket: "",
      messagingSenderId: "64466382438",
      appId: "1:64466382438:web:c44968deadbb59d33307a7"
    })
  ],
  providers: [AngularFireAuthModule,AngularFireAuthGuard,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'},commService,{ provide: StorageBucket, useValue: 'patient-medical-system.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
