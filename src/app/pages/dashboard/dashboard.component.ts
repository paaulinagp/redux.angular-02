import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../shared/services/ingreso-egreso.service';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;

  constructor(private _strore: Store<AppState>, private _ingresoEgresoService: IngresoEgresoService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions = this._strore.select('auth')
    .pipe(
      filter(({user}) => !!user )
    )
    .subscribe(({user}) => {
      this._ingresoEgresoService.initIngresosEgresosListener(user?.uid);
    });
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
