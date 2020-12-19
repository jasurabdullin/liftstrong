import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/_services/auth.service';
import * as rootReducer from '../../../_reducers/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();

  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<rootReducer.State>,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(rootReducer.getAuthState);
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.onClose();
  }

}
