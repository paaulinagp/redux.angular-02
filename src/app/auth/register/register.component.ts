import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../shared/services/auth.service';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _router: Router, 
    private _authService: AuthService,
    private _store: Store<AppState>,
    private _toastr: ToastrService
  ) {
    this.formGroup = this._fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  createUser(){
    if(this.formGroup.invalid){
      return;
    }
    this._store.dispatch(uiActions.showLoading());

    const { nombre, email, password } = this.formGroup.value;

    this._authService.createUser(nombre, email, password)
    .then(() => {
      this._store.dispatch(uiActions.hideLoading());
      this._router.navigate(['/dashboard']);
      

    })
    .catch((error) => {
      this._store.dispatch(uiActions.hideLoading());
      this._toastr.error(error.message, 'ERROR:')
    });
    
  }

}
