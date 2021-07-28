import { ViewChild, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { TimerComponent } from '../components/timer/timer.component';
import { Speed } from '../components/background/speed';
import { EggComponent } from '../components/egg/egg.component';
import { CommonService } from '../services/common.service';
import { Util } from '../util';
import { AudioService } from '../services/audio.service';
import { sounds } from '../services/sounds';

@Component({
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 1 }),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms 50ms ease-out', style({ opacity: 0 }))
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms 350ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0s', style({ opacity: 1 }))
      ]),
    ])
  ],
  selector: 'app-game',
  styleUrls: ['game.page.scss'],
  templateUrl: 'game.page.html'
})
export class GamePage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(TimerComponent) timerComponent: TimerComponent;
  @ViewChild(EggComponent) eggComponent:
  EggComponent;

  readonly speed = Speed;

  isCountdownFinnished = false;
  isGameStarted = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(private readonly common: CommonService, private readonly audio: AudioService) {}

  async ngOnInit() {
    this.subscriptions.push(this.subscribeToTimer());
  }

  ngAfterViewInit() {
    // this.audio.loop(sounds.synthAmbient.id);
  }

  ngOnDestroy() {
    Util.unsubscribe(this.subscriptions);
  }

  async startGame(isStarted: boolean) {
    setTimeout(() => {
      this.isGameStarted = isStarted;
    }, 50);

    this.common.setCountdownFinnished(false);
  }

  restartGame() {
    this.common.setCountdownFinnished(false);
    this.eggComponent.initEgg();
    this.timerComponent.restartTimer();
  }

  handleFirstFire() {
    this.timerComponent.startTimer();
  }

  private subscribeToTimer() {
    return this.common.getCountdownObservable().subscribe((status: boolean) => {
      this.isCountdownFinnished = status;
    });
  }
}
