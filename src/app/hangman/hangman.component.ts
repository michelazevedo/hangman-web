import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GameDialogComponent } from '../game-dialog/game-dialog.component';
import { GuessResult } from '../model/guess-result';
import { guess, start } from '../state/hangman.actions';
import * as fromApp from "../state/hangman.reducer";

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
  characters: string[];
  guessWord: string[];
  imageName: string;
  state$: Observable<fromApp.State>;
  stateSubscription: Subscription;
  buttonsDisabled: object;

  ASCII_A_CODE = 65;
  ASCII_Z_CODE = 91;

  constructor(private store: Store<fromApp.State>,
    public dialog: MatDialog) {

    this.characters = [];
    this.guessWord = [];
    this.imageName = "Hangman-6.png";
    this.buttonsDisabled = {};
    this.state$ = this.store.pipe(select(fromApp.selectHangman));
  }

  guess(char: string) {
    this.buttonsDisabled[char] = true;
    this.store.dispatch(guess({ char }));
  }

  getButtonDisabled( label: string): boolean {
    return this.buttonsDisabled[label];
  }
  getGuessPainelStyle(): string {
    return "grid-template-columns: repeat(" + this.guessWord.length + ", 1fr);"
  }

  ngOnInit(): void {
    for (let i = this.ASCII_A_CODE; i < this.ASCII_Z_CODE; i++) {
      this.characters.push(String.fromCharCode(i));
    }

    this.stateSubscription = this.state$.subscribe((state) => {
      const data = state["data"] as GuessResult;
      if ( data.guessedChars && data.guessedChars.length ){
        this.guessWord = data.guessedChars.map(item => item === "" ? "_" : item);
      } else {
        this.guessWord = [];
        for (let c = 0; c < data.wordLength; c++) {
          this.guessWord.push("_");
        }
      }
      this.imageName = "Hangman-" + data.remaingAttempts + ".png";

      if (data.gameOver) {
        this.dialog.open(GameDialogComponent).afterClosed().subscribe(result => {
          // Restart the game
          this.buttonsDisabled = {};
          this.store.dispatch(start());
        });
      }
    });

    this.store.dispatch(start());
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }
}