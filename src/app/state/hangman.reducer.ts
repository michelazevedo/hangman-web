import { Action, createReducer, createSelector, on } from '@ngrx/store';
import * as GameActions  from './hangman.actions';

export class State {
  wordLength : number;
  guessed: string[];
  remaingAttempts : number;
  maxAttempts : number;
  guess: string;
  guessPosition: number[];
  result: boolean;
}

export const initialState: State = {
    wordLength : 0,
    guessed: [],
    remaingAttempts : 0,
    maxAttempts : 0,
    guess: "",
    guessPosition: [],
    result: false    
};

const hangmanReducer = createReducer(
  initialState,
  
  on(GameActions.startSuccess, (state, {payload}) => {
    return {...state, 
      guess: payload.guess,
      guessPosition: payload.guessPosition,
      maxAttempts: payload.maxAttempts,
      remaingAttempts: payload.remaingAttempts,
      result: payload.result,
      wordLength: payload.wordLength }
  }),
  
  on(GameActions.guessSuccess, (state, {payload}) => {
    return {...state, 
      guess: payload.guess,
      guessPosition: payload.guessPosition,
      maxAttempts: payload.maxAttempts,
      remaingAttempts: payload.remaingAttempts,
      result: payload.result,
      wordLength: payload.wordLength }
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