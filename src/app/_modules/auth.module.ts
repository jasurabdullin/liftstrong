
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SharedModule } from './shared.module';
import { AuthRoutingModule } from '../_routes/auth-routing.module';

import { LoginComponent } from '../_components/auth/login/login.component';
import { SignupComponent } from '../_components/auth/signup/signup.component';

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent,
    ],
    imports: [
        ReactiveFormsModule,
        AngularFireAuthModule,
        SharedModule,
        AuthRoutingModule,
    ],
    exports: []
})
export class AuthModule {

}
