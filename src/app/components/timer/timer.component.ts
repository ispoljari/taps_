import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Timer } from 'easytimer.js';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {

  readonly targetTime = 5;
  readonly timer = new Timer({countdown: true, precision: 'secondTenths'});

  currentTimeSec = this.targetTime;
  currentTimeMilSec = 0;
  timerFinnished = null;

  constructor(private common: CommonService) {}

  ngOnInit() {
    this.timerFinnished = this.timer.addEventListener('targetAchieved', this.coundownFinnishedHandler);
  }

  startTimer() {
    this.timer.start({startValues: {seconds: this.targetTime}, callback: (timer) => {
      this.currentTimeSec = this.timer.getTotalTimeValues().seconds;
      this.currentTimeMilSec = this.timer.getTotalTimeValues().secondTenths%10;
    }});
  };

  restartTimer() {
    this.currentTimeSec = this.targetTime;
  }

  ngOnDestroy() {
    this.timerFinnished.removeEventListener('targetAchieved', this.coundownFinnishedHandler);
  }

  private coundownFinnishedHandler = () => {
    this.currentTimeSec = 0;
    this.currentTimeMilSec = 0;
    this.common.setCountdownFinnished(true);
  };

}
