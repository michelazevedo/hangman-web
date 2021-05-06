import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { guess, start, startSuccess } from './hangman.actions';
import { exhaustMap } from 'rxjs/operators';
import * as fromApp from './hangman.reducer';
import { HangmanService } from '../service/hangman.service';

@Injectable()
export class HangmanEffects {
  start$ = createEffect(() =>
      this.actions$.pipe(
        ofType(start),
        exhaustMap((params) => {
            this.service.start();
            return [];
        })
      )
  );

  guess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(guess),
      exhaustMap((params) => {
          this.service.guess(params.char);
          return [];
      })
    )
  );
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.State>,
    private service: HangmanService
  ) {}
}