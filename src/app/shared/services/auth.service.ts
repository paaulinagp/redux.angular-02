import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _auth: AngularFireAuth, private _fireStore: AngularFirestore) { }


  initAuthListener() {
    this._auth.authState.subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
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
