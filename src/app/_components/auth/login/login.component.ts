import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as rootReducer from '../../../_reducers/app.reducer';
import { UIService } from 'src/app/_services/ui.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<rootReducer.State>,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(rootReducer.getLoadingState);
    this.handleLoginForm();
  }

  handleLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
