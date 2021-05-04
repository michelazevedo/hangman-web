import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { startSuccess } from './hangman.actions';
import { exhaustMap } from 'rxjs/operators';
import * as fromApp from './hangman.reducer';

@Injectable()
export class HangmanEffects {
  startGame$ = createEffect(() =>
      this.actions$.pipe(
        ofType(startSuccess),
        exhaustMap((result) => {
            console.log(result);
            return [];
        })
      )
  );
 
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.State>
  ) {}
}