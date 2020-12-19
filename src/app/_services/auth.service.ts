import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { UIService } from './ui.service';
import { ExerciseService } from './exercise.service';

import * as UI from '../_reducers/actions/ui.actions';
import * as Auth from '../_reducers/actions/auth.actions';

import * as rootReducer from '../_reducers/app.reducer';

import { AuthData } from '../_models/auth-data.model';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private auth: AngularFireAuth,
        private exerciseService: ExerciseService,
        private uiService: UIService,
        private store: Store<rootReducer.State>,
    ){}

    initAuthListener(): void {
        this.auth.authState.subscribe(user => {
            if (user){
                this.allowAccess();
            } else {
                this.removeAccess();
            }
        });
    }

    registerUser(data: AuthData): void {
        const { email, password } = data;
        this.store.dispatch(new UI.StartLoading());
        this.auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                // console.log(result);
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.notify(error.message, null, 3000);
            });
    }

    login(data: AuthData): void {
        const { email, password } = data;
        this.store.dispatch(new UI.StartLoading());
        this.auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                // console.log(result);
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.notify(error.message, null, 3000);
            });
    }

    logout(): void {
        this.auth.signOut();
    }

    private allowAccess(): void {
        this.store.dispatch(new Auth.Authenticate());
        this.router.navigate(['/exercises']);
    }

    private removeAccess(): void {
        this.store.dispatch(new Auth.DenyAccess());
        this.exerciseService.cancelSubscriptions();
        this.router.navigate(['/']);
    }
}
