import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GuessResult } from '../model/guess-result';
import { Store } from '@ngrx/store';
import * as fromApp from '../state/hangman.reducer';
import { guessSuccess, startSuccess } from '../state/hangman.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {
  private APP_URL = "http://localhost:8080/hangman";
  private START_GAME_URL = "/start";
  private GUESS_GAME_URL = "/guess";
  
  constructor(private httpClient: HttpClient, private store: Store<fromApp.State>) { }

  start(): void {
    this.httpClient.get<GuessResult>( this.APP_URL + this.START_GAME_URL, {observe: 'response', withCredentials: true})
      .pipe( 
        tap( 
          (result) => this.store.dispatch(startSuccess({payload: result.body})),
          (error) => console.log(error)
        )).subscribe();
  }

  guess( ch: string): void {
    this.httpClient.get<GuessResult>( this.APP_URL + this.GUESS_GAME_URL + "/" + ch, {observe: 'response', withCredentials: true})
      .pipe( 
        tap( 
          (result) => this.store.dispatch(guessSuccess({payload: result.body})),
          (error) => console.log(error)
        )).subscribe();
  }
}
