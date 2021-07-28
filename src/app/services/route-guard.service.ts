import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { StorageID } from './storage';
import { sounds } from './sounds';
import { ScoreService } from './score.service';
import { IonLoaderService } from './ion-loader.service';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private readonly audio: AudioService,
    private readonly loader: IonLoaderService,
    private readonly storage: StorageService,
    private readonly score: ScoreService,
    private readonly platform: Platform
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const isLoaderPresent = await this.loader.createLoader();
    const highScore = await this.storage.get(StorageID.highScore);
    const soundPreference = await this.storage.get(StorageID.soundPreference);


    if(!!highScore || highScore === 0) {
      await this.score.setHighScore(highScore);
    }

    if(typeof soundPreference === 'boolean') {
      await this.audio.setAudioPreference(soundPreference);
    }

    await this.platform.ready();

    await this.audio.preloadSimple(sounds.soundOn.id, sounds.soundOn.path);
    await this.audio.preloadSimple(sounds.startGame.id, sounds.startGame.path);
    await this.audio.preloadSimple(sounds.punch.id, sounds.punch.path);
    // this.audio.preloadComplex(sounds.synthAmbient.id, sounds.synthAmbient.path);

    if (isLoaderPresent) {
      this.loader.dismissLoader();
    }

    return true;
  }
}
