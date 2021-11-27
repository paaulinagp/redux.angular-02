import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private _authService: AuthService,
    private _firestore: AngularFirestore
  ) {}

  create(ingresoEgreso: IngresoEgreso) {
    const uid = this._authService.user?.uid;

    return this._firestore
      .doc(`${uid}/ingresos-egresos`)
      .collection('items')
      .add({...ingresoEgreso })
  }

  initIngresosEgresosListener( uid?: string ){
    this._firestore.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe(
      map((snapshot) => snapshot.map( doc => ({uid: doc.payload.doc.id, ...doc.payload.doc.data() as any } )))
    )
    .subscribe((data) => {
      console.log(data);
    });
  }
}
