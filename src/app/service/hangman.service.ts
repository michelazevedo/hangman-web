import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GuessResult } from '../model/guess-result';
import { Store } from '@ngrx/store';
import * as fromApp from '../state/hangman.reducer';
import { guessSuccess, startSuccess } from '../state/hangman.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  APP_URL = "http://localhost:8080/hangman";

  constructor(private httpClient: HttpClient, private store: Store<fromApp.State>) { }

  start(): void {
    console.log( this.APP_URL + "/start");
    this.httpClient.get<GuessResult>( this.APP_URL + "/start", {observe: 'response', withCredentials: true})
      .pipe( 
        tap( 
          (result) => this.store.dispatch(startSuccess({payload: result.body})),
          (error) => console.log(error)
        )).subscribe();
  }

  guess( ch: string): void {
    console.log( this.APP_URL + "/guess?ch=" + ch);
    this.httpClient.get<GuessResult>( this.APP_URL + "/guess?ch=" + ch, {observe: 'response', withCredentials: true})
      .pipe( 
        tap( 
          (result) => this.store.dispatch(guessSuccess({payload: result.body})),
          (error) => console.log(error)
        )).subscribe();
  }
}
