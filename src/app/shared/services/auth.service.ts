import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import * as authActions from '../../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(
    private _auth: AngularFireAuth, 
    private _fireStore: AngularFirestore,
    private _store: Store
  ) {
    this.userSubscription = new Subscription();
  }


  initAuthListener() {
    this._auth.authState.subscribe( fuser => {
      if(fuser) {
        this.userSubscription = this._fireStore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this._store.dispatch(authActions.setUser({ user }));
        })
      }
      else {
        this._store.dispatch(authActions.unSetUser());
        this.userSubscription.unsubscribe();
      }
    });
  }


  createUser(nombre: string, email: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(email, password)
    .then(({user})=> {

      const newUser = new User(user?.uid, nombre, user?.email);

      this._fireStore.doc(`${user?.uid}/usuario`)
        .set({ ...newUser });

    });
  }

  loginUser( email: string, password: string) {
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this._auth.signOut();
  }

  isAuth() {
    return this._auth.authState.pipe(
      map( (fuser) => fuser != null )
    );
  }
}
