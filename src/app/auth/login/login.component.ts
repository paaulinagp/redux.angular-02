import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _router: Router
  ) {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  login(){
    if(this.formGroup.invalid){
      return;
    }

    const { email, password } = this.formGroup.value;

    this._authService.loginUser(email, password)
    .then((credentials) => {
      console.log(credentials);
      this._router.navigate(['/dashboard']);
    })
    .catch((error) => console.log(error));
    
  }

}
