import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { UIService } from 'src/app/_services/ui.service';
import { AuthService } from 'src/app/_services/auth.service';
import * as rootReducer from '../../../_reducers/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<rootReducer.State>,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(rootReducer.getLoadingState);
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
