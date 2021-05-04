import { createAction, props } from '@ngrx/store';
import { GuessResult } from '../model/guess-result';

export const start = createAction('[Hangman Component] Start');
export const startSuccess = createAction(
    '[Hangman Component] Start Success',
    props<{payload: GuessResult}>()
);
export const startError = createAction(
    '[Hangman Component] Start Error',
    props<{payload: GuessResult}>()
);

export const guess = createAction(
    '[Hangman Component] Guess',
    props<{char: string}>()
);
export const guessSuccess = createAction(
    '[Hangman Component] Guess Success',
    props<{payload: GuessResult}>()
);
export const guessError = createAction(
    '[Hangman Component] Guess Error',
    props<{payload: GuessResult}>()
);

export const reset = createAction('[Hangman Component] Reset');
export const resetSuccess = createAction(
    '[Hangman Component] Reset Success',
    props<{payload: GuessResult}>()
);
