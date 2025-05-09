import {Component} from '@angular/core';
import {AppModel, AppState, GameState} from '../../core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatInputModule, MatButton],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public model: AppModel) {}

  updateValue(property: string, target: any | null) {
    this.model.updateProperty(property, target.value);
  }

  changeGameState() {
    this.model.updateProperty('state', GameState.Game);
  }
}

