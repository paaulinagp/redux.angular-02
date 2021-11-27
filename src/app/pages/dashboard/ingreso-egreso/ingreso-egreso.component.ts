import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { IngresoEgreso } from '../../../shared/models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../../shared/services/ingreso-egreso.service';
import * as uiActions from '../../../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit {

  formGroup: FormGroup;
  type: string;

  constructor(
    private _fb: FormBuilder, 
    private _ingresoEgresoService: IngresoEgresoService,
    private _store: Store,
    private _toastr: ToastrService,
  ) {
    this.formGroup = this._fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.type = 'ingreso';
  }

  ngOnInit(): void {
  }

  create() {
    if(this.formGroup.invalid){
      return;
    }
    
    this._store.dispatch(uiActions.showLoading());

    const { description, amount } = this.formGroup.value;

    const data = new IngresoEgreso(description, amount, this.type);

    this._ingresoEgresoService.create(data)
    .then(() => { 
      this._store.dispatch(uiActions.hideLoading());
      this._toastr.success('Registro exitoso');
      this.formGroup.reset();
    })
    .catch((error)=> {
      this._store.dispatch(uiActions.hideLoading());
      this._toastr.error(error.message, 'ERROR:');
    });

  }

}
