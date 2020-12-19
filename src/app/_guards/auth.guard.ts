import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot } from '@angular/router';

import * as rootReducer from '../_reducers/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor( private store: Store<rootReducer.State> ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(rootReducer.getAuthState).pipe(take(1));
    }

    canLoad(route: Route): Observable<boolean> {
        return this.store.select(rootReducer.getAuthState).pipe(take(1));
    }
}