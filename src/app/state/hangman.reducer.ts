import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as GameActions  from './hangman.actions';

export class State {
  remaingAttempts : number;
  guessedChars: string[];
  gameOver: boolean;
  wordLength: number;
}

export const initialState: State = {
    remaingAttempts : 0,
    guessedChars: [],
    gameOver: false,
    wordLength: 0
};

const hangmanReducer = createReducer(
  initialState,
  
  on(GameActions.startSuccess, (state, {payload}) => {
    return {...state, 
      guessedChars: payload.guessedChars,
      remaingAttempts: payload.remaingAttempts,
      gameOver: payload.gameOver,
      wordLength: payload.wordLength
     }
  }),
  
  on(GameActions.guessSuccess, (state, {payload}) => {
    return {...state, 
      guessedChars: payload.guessedChars,
      remaingAttempts: payload.remaingAttempts,
      gameOver: payload.gameOver,
      wordLength: payload.wordLength
     }
  }),
  
  on(GameActions.reset, (state) => {
    return {...initialState }
  })
);

export const selectHangmanState = (state: State) => state;
 
export const selectHangman = createSelector(
  selectHangmanState,
  (state: State) => state
);

export function reducer(state: State | undefined, action: Action): State {
  return hangmanReducer(state, action);
}