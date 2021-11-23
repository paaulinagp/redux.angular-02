import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _auth: AngularFireAuth) { }


  initAuthListener() {
    this._auth.authState.subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    });
  }


  createUser(nombre: string, email: string, password: string) {
    return this._auth.createUserWithEmailAndPassword(email, password);
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
