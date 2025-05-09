import {Component} from '@angular/core';
import {AppModel, CellPicture, CellState, KeyboardControlsManager} from '../../core';
import {GameManager} from '../../core/managers/game/game.manager';

@Component({
  selector: 'app-game',
  providers: [
    KeyboardControlsManager,
    GameManager
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  CellState = CellState;
  CellPicture = CellPicture;

  infoElements: { picture: CellPicture, label: string }[] = [
    { picture: CellPicture.Player, label: 'Jugador ' },
    { picture: CellPicture.Wumpu, label: 'Wumpu ' },
    { picture: CellPicture.Gold, label: 'Oro ' },
    { picture: CellPicture.Pit, label: 'Hoyo ' },
    { picture: CellPicture.Breeze, label: 'Hoyo cerca de ti ' },
    { picture: CellPicture.Stench, label: 'Wumpu cerca de ti ' }
  ];


  constructor(
    public model: AppModel,
    private keyboardControlsManager: KeyboardControlsManager,
    private gameManager: GameManager
  ) {
  }
}
