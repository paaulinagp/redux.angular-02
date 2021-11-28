import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../../shared/models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../../shared/services/ingreso-egreso.service';
import * as uiActions from '../../../shared/ui.actions';
import { ToastrService } from 'ngx-toastr';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso/ingreso-egresos.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;
  items: IngresoEgreso[] = [];

  constructor(
    private _store: Store<AppStateWithIngresoEgreso>,
    private _ingresoEgresoService: IngresoEgresoService,
    private _toastr: ToastrService,
  ) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions = this._store.select('ingresosEgresos').subscribe(({items}) => this.items = items );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  deleteItem(uid?: string) {
    this._store.dispatch(uiActions.showLoading());
    this._ingresoEgresoService.deleteItem(uid)
    .then(() => {
      this._store.dispatch(uiActions.hideLoading());
      this._toastr.success('Se eliminó correctamente');
    })
    .catch((error) => {
      this._store.dispatch(uiActions.hideLoading());
      this._toastr.error(error.message, 'ERROR:');
    });
  }

}
