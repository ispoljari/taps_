import {  Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription  } from 'rxjs';
import {
  keyframes,
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { CommonService } from '../../services/common.service';
import { Util } from '../../util';
import { ScoreService } from '../../services/score.service';
import { AudioService } from '../../services/audio.service';
import { sounds } from '../../services/sounds';

@Component({
  animations: [
    trigger('fire', [
      transition('* <=> *', [
        animate('0.7s ease-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scaleY(0.9) scaleX(1.1)', offset: 0.1 }),
          style({ transform: 'scaleY(1.1) scaleX(0.9)', offset: 0.28 }),
          style({ transform: 'scaleY(0.94) scaleX(1.05)', offset: 0.48 }),
          style({ transform: 'scaleY(1.06) scaleX(0.95)', offset: 0.68 }),
          style({ transform: 'scaleY(0.98) scaleX(1.03)', offset: 0.88 }),
          style({ transform: 'scaleY(1.03) scaleX(0.97)', offset: 0.98 }),
          style({ transform: 'scale(1)', offset: 1 }),
        ]))
      ])
  ])
  ],
  selector: 'app-egg',
  templateUrl: './egg.component.html',
  styleUrls: ['./egg.component.scss'],
})
export class EggComponent implements OnInit, OnDestroy {

  @Output() readonly firstFire: EventEmitter<void> = new EventEmitter();

  readonly instruction = 'Start tapping';

  animState: AnimState = AnimState.start;
  isCountdownFinnished = false;
  score = 0;

  private readonly subscriptions: Subscription[] = [];

  constructor(private common: CommonService, private scores: ScoreService, private audio: AudioService) { }

  ngOnInit() {
    this.initEgg();
    this.subscriptions.push(this.subscribeToTimer());
  }

  ngOnDestroy() {
    Util.unsubscribe(this.subscriptions);
  }


  async onClick() {
    this.toggleAnimState();

    await this.audio.play(sounds.punch.id);
    this.incrementScore();

    if (this.score === 1) {
      this.firstFire.emit();
    }
  }

  initEgg() {
    this.score = 0;
    this.animState = AnimState.start;

    this.scores.setScore(0);
  }

  private incrementScore() {
    this.score++;
  }

  private subscribeToTimer() {
    return this.common.getCountdownObservable().subscribe((status: boolean) => {
      this.isCountdownFinnished = status;

      if (status) {
        this.scores.setScore(this.score);
      }
    });
  }

  private toggleAnimState(): void {
    this.animState = this.animState === AnimState.start ? AnimState.end : AnimState.start;
  }

}

enum AnimState {
  start = 'start',
  end = 'end',
}
