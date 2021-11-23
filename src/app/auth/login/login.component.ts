import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private _authService: AuthService, 
    private _fb: FormBuilder, 
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _toastr: ToastrService,
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  login() {
    if(this.formGroup.invalid){
      return;
    }

    this._spinner.show();

    const { email, password } = this.formGroup.value;

    this._authService.loginUser(email, password)
    .then((credentials) => {
      console.log(credentials);
      this._router.navigate(['/dashboard']);
      this._spinner.hide();
    })
    .catch((error) => {
      this._spinner.hide();
      this._toastr.error(error.message, 'ERROR:');

    });
    
  }

}
