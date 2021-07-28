import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Subscription  } from 'rxjs';
import {ScoreService} from '../../services/score.service';
import { Util } from '../../util';
import { AudioService } from '../../services/audio.service';
import { sounds } from '../../services/sounds';

@Component({
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms 1s ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ]),
    ])
  ],
  selector: 'app-restart',
  templateUrl: './restart.component.html',
  styleUrls: ['./restart.component.scss'],
})
export class RestartComponent implements OnInit, OnDestroy {

  @Output() readonly restartGame: EventEmitter<void> = new EventEmitter();

  isVisible = true;
  isAnimationFinnished = false;
  currentScore = 0;
  highScore = 0;

  private readonly subscriptions: Subscription[] = [];

  constructor(private readonly scores: ScoreService, private readonly audio: AudioService) {}

  ngOnInit() {
    this.subscriptions.push(this.subscribeToScores());
  }

  async onClick() {
    if(this.isAnimationFinnished) {
      this.isVisible = false;

      await this.audio.play(sounds.startGame.id);

      this.restartGame.emit();
    }
  }

  animationStarted() {
    this.isAnimationFinnished = false;
  }

  animationDone() {
    this.isAnimationFinnished = true;
  }

  ngOnDestroy() {
    Util.unsubscribe(this.subscriptions);
  }

  private subscribeToScores() {
    return this.scores.getScoreObservable().subscribe((score: number) => {
      this.currentScore = score;
      this.highScore = this.scores.getHighScore();
    });
  }
}
