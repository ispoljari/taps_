import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { StorageID } from './storage';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject = new BehaviorSubject<number>(0);
  private scoreObservable$: Observable<number> = this.scoreSubject.asObservable();

  private highScore = 0;

  constructor(private readonly storage: StorageService) {
  }

  public setScore(score: number): void {
    if (score > this.highScore) {
      this.setHighScore(score);
    }

    return this.scoreSubject.next(score);
  }

  public getScoreObservable(): Observable<number> {
    return this.scoreObservable$;
  }

  public getHighScore(): number {
    return this.highScore;
  }

  public async setHighScore(highScore: number): Promise<void> {
    this.highScore = highScore;
    try {
      await this.saveHighScoreToStorage();
    } catch (error) {}
  }

  private async saveHighScoreToStorage() {
    if (this.storage.get(StorageID.highScore)) {
      try {
        await this.storage.remove(StorageID.highScore);
      } catch (error) {}
    }

    try {
      await this.storage.set(StorageID.highScore, this.highScore);
    } catch (error) {}
  }
}
