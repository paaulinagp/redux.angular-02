import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../../shared/models/ingreso-egreso.model';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso/ingreso-egresos.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  constructor(private _store: Store<AppStateWithIngresoEgreso>) { }

  ngOnInit(): void {
    this._store.select('ingresosEgresos')
    .subscribe(({items}) => {
      this.createEstadistics(items);
    });
  }


  createEstadistics(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    
    items.forEach( item => {
      if(item.type === 'ingreso'){
        this.totalIngresos += item.amount;
        this.ingresos++;
      }
      if(item.type === 'egreso'){
        this.totalEgresos += item.amount;
        this.egresos++;
      }
    });
  }

}
