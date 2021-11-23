import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../shared/services/auth.service';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isLoading: boolean;
  subscriptions: Subscription;

  constructor(
    private _authService: AuthService, 
    private _fb: FormBuilder, 
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _store: Store<AppState>,
    private _toastr: ToastrService,
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.isLoading = false;
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {

    this.subscriptions = this._store.select('ui').subscribe(ui => {
      console.log('subscribe ui');
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
   this.subscriptions.unsubscribe();
  }

  login() {
    if(this.formGroup.invalid){
      return;
    }

    this._store.dispatch(uiActions.showLoading());

    // this._spinner.show();

    const { email, password } = this.formGroup.value;

    this._authService.loginUser(email, password)
    .then((credentials) => {
      console.log(credentials);
      this._router.navigate(['/dashboard']);
      // this._spinner.hide();
      this._store.dispatch(uiActions.hideLoading());
    })
    .catch((error) => {
      // this._spinner.hide();
      this._store.dispatch(uiActions.hideLoading());
      this._toastr.error(error.message, 'ERROR:');

    });
    
  }

}
