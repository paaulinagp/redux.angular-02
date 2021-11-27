import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../app.reducer';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User | null;
  subscriptions: Subscription;

  constructor(
    private _authService: AuthService, 
    private _router: Router,
    private _store: Store<AppState>
  ) {
    this.user = null;
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.subscriptions = this._store.select('auth')
    .subscribe(({user}) => {
      this.user = user;
    });
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  logout() {
    this._authService.logout().then(() => {
      this._router.navigate(['/login']);
    });
  }


}
