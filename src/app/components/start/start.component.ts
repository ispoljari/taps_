import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import {sounds} from '../../services/sounds';

@Component({
  selector: 'app-start',
  styleUrls: ['./start.component.scss'],
  templateUrl: './start.component.html'
})
export class StartComponent {

  @Output() readonly startGame: EventEmitter<boolean> = new EventEmitter();

  isStarted = false;

  constructor(private readonly audio: AudioService) { }

  async handleClick() {
    this.isStarted = !this.isStarted;

    if(this.isStarted) {
      await this.audio.play(sounds.startGame.id);
    }

    this.startGame.emit(this.isStarted);
  }

}
