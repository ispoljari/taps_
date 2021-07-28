import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable  } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private countdownFinnishedSubject = new BehaviorSubject<boolean>(false);
  private countdownObservable$: Observable<boolean> = this.countdownFinnishedSubject.asObservable();

  constructor() {}

  setCountdownFinnished(status: boolean): void {
    return this.countdownFinnishedSubject.next(status);
  }

  getCountdownObservable(): Observable<boolean> {
    return this.countdownObservable$;
  }
}
