import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { GamePage } from './game.page';
import { GamePageRoutingModule } from './game-routing.module';
import { EggComponent } from '../components/egg/egg.component';
import { StartComponent } from '../components/start/start.component';
import { TimerComponent } from '../components/timer/timer.component';
import { BackgroundComponent } from '../components/background/background.component';
import { RestartComponent } from '../components/restart/restart.component';
import { SoundIconComponent } from '../components/sound-icon/sound-icon.component';

@NgModule({
  declarations: [BackgroundComponent, EggComponent, GamePage, RestartComponent, StartComponent, TimerComponent, SoundIconComponent],
  imports: [
    CommonModule,
    FormsModule,
    GamePageRoutingModule,
    IonicModule
  ],
  providers: [{ provide: 'Window', useValue: window }, NativeAudio]
})
export class GamePageModule {}
