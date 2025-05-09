import {Component} from '@angular/core';
import {AppModel, GameState} from '../../core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  imports: [
    MatButton
  ],
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
  GameState = GameState;
  constructor(public model: AppModel) {
  }

  resetGameState() {
    this.model.updateProperty('arrows', 2);
    this.model.updateProperty('state', GameState.Home);
  }
}
