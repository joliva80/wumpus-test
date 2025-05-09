import { Component } from '@angular/core';
import {AppModel, fadeInOutAnimation, GameState, KeyboardControlsManager} from './core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {GameOverComponent} from './components/game-over/game-over.component';
import {GameComponent} from './components/game/game.component';

@Component({
  selector: 'app-root',
  providers: [AppModel],
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    HomeComponent,
    GameOverComponent,
    GameComponent
  ],
  styleUrl: './app.component.scss',
  animations: [ fadeInOutAnimation ]
})
export class AppComponent {
  GameState = GameState;
  constructor(public model: AppModel) {
  }
}
