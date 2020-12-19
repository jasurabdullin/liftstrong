import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { reducers } from '../_reducers/app.reducer';

import { AuthModule } from './auth.module';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from '../_routes/app-routing.module';

import { AppComponent } from '../_components/app/app.component';
import { WelcomeComponent } from '../_components/welcome/welcome.component';
import { HeaderComponent } from '../_components/navigation/header/header.component';
import { SidenavListComponent } from '../_components/navigation/sidenav-list/sidenav-list.component';

import { UIService } from '../_services/ui.service';
import { AuthService } from '../_services/auth.service';
import { ExerciseService } from '../_services/exercise.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    // FormsModule,
    // ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers),
  ],
  providers: [AuthService, ExerciseService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
