import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { sounds } from '../../services/sounds';

@Component({
  selector: 'app-sound-icon',
  templateUrl: './sound-icon.component.html',
  styleUrls: ['./sound-icon.component.scss'],
})
export class SoundIconComponent implements OnInit {
  isAudioOn = false;

  constructor(private readonly audio: AudioService) {}

  ngOnInit() {
    this.init();
  }

  async toggleSound() {
    this.isAudioOn = !this.isAudioOn;
    await this.audio.setAudioPreference(this.isAudioOn);

    if(this.isAudioOn) {
      await this.audio.play(sounds.soundOn.id);
      // await this.audio.loop(sounds.synthAmbient.id);
    }
    // else {
    //   await this.audio.stop(sounds.synthAmbient.id);
    // }
  }

  private init() {
    this.isAudioOn = this.audio.getAudioPreference();
  }
}
