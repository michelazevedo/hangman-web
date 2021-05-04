import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HangmanService } from '../service/hangman.service';
import * as fromApp from "../state/hangman.reducer";

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
  characters: string[];
  guessWord: string[];
  image: string;
  state$: Observable<fromApp.State>;
  stateSubscription: Subscription;

  constructor(private service: HangmanService,
    private store: Store<fromApp.State>) {
    
    this.characters = [];
    this.guessWord = [];
    this.image = "Hangman-0.png";

    this.state$ = this.store.pipe(select(fromApp.selectHangman));
  }

  guess( ch: string){
    this.service.guess( ch);
  }

  ngOnInit(): void {
    for (let i = 65; i < 91; i++) {
      this.characters.push(String.fromCharCode(i));
    }

    this.stateSubscription = this.state$.subscribe((state) => {
      const data = state["data"];
      for (let i = 0; i < data.wordLength; i++) {
        this.guessWord.push("X");        
      }
      const n = Number(data.maxAttempts) - Number(data.remaingAttempts);
      this.image = "assets\\Hangman-" + n + ".png";
    });

    this.service.start();
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }
}
