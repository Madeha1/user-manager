import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './home/form/form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';  
import { AngularFireModule } from '@angular/fire';  
import { AngularFireDatabaseModule } from '@angular/fire/database';  
import { AngularFirestoreModule } from '@angular/fire/firestore';  
import { environment } from 'src/environments/environment';
import { EditFormComponent } from './users/edit-form/edit-form.component';  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    AboutComponent,
    FormComponent,
    EditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,  
    AngularFireModule.initializeApp(environment.firebaseConfig),  
    AngularFireDatabaseModule,  
    AngularFirestoreModule ,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
