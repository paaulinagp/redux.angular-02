import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _router: Router, 
    private _authService: AuthService
  ) {
    this.formGroup = this._fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  createUser(){
    if(this.formGroup.invalid){
      return;
    }

    const { nombre, email, password } = this.formGroup.value;

    this._authService.createUser(nombre, email, password)
    .then((credentials) => {
      console.log(credentials);
      this._router.navigate(['/dashboard']);
    })
    .catch((error) => console.log(error));
    
  }

}
