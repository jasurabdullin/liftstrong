import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/_services/auth.service';
import * as rootReducer from '../../../_reducers/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<rootReducer.State>,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(rootReducer.getAuthState);
  }

  toggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
