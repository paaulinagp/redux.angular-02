import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { AppState } from './app.reducer';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;

  constructor(
    private _authService: AuthService, 
    private _spinner: NgxSpinnerService,
    private _store: Store<AppState>,
  ) {
    this._authService.initAuthListener();
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.subscriptions = this._store.select('ui').subscribe(ui => {
      console.log('subscribe ui');
      if(ui.isLoading) {
        this._spinner.show();
      } else {
        this._spinner.hide();
      }
    });
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
}
