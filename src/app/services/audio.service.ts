import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StorageService } from './storage.service';
import { StorageID } from './storage';

interface Sound {
  key: string;
  asset: string;
  html: HTMLAudioElement;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioOn = false;
  private audioType = 'native';
  private complexSounds: Array<Sound> = [];
  private simpleSounds: Array<Sound> = [];

  constructor(private readonly storage: StorageService, private readonly platform: Platform, private readonly nativeAudio: NativeAudio) {
    if(platform.is('cordova')) {
      this.audioType = 'native';
    } else {
      this.audioType = 'html5';
    }
  }

  public async setAudioPreference(audioOn: boolean): Promise<void> {
    this.audioOn = audioOn;

    try {
      await this.saveAudioPreferenceToStorage();
    } catch (error) {}
  }

  public getAudioPreference(): boolean {
    return this.audioOn;
  }

  public async preloadSimple(key: string, asset: string): Promise<void> {

    const audio = {
        key,
        asset,
        html: new Audio(asset)
    };

    this.simpleSounds.push(audio);

    if(this.audioType === 'native'){
      try {
          await this.nativeAudio.preloadSimple(key, asset);
      } catch (error) {}
    }
  }

  public async preloadComplex(key: string, asset: string): Promise<void> {

    const audio = {
        key,
        asset,
        html: new Audio(asset)
    };

    this.complexSounds.push(audio);

    if(this.audioType === 'native'){
      try {
          await this.nativeAudio.preloadComplex(key, asset, 1, 1, 0);
      } catch (error) {}
    }
  }

  public async play(key: string): Promise<void> {

    if (this.audioOn) {
      const audio = this.simpleSounds.find((sound) => sound.key === key);

      if(this.audioType === 'html5' && !!audio?.html){
        audio.html.currentTime=0;
        audio.html.volume = 0.5;
        await audio.html.play();
      } else {
        try {
          await this.nativeAudio.play(key);
        } catch (error) {}
      }
    }
  }

  public async loop(key: string): Promise<void> {

    if (this.audioOn) {
        const audio = this.complexSounds.find((sound) => sound.key === key);

        if(this.audioType === 'html5' && !!audio?.html){
          audio.html.currentTime=0;
          audio.html.loop = true;
          await audio.html.play();
        } else {
          try {
            await this.nativeAudio.loop(key);
          } catch (error) {}
      }
    }
  }

  public async stop(key: string): Promise<void> {

    const audio = this.complexSounds.find((sound) => sound.key === key);

    if(this.audioType === 'html5' && !!audio?.html){
      audio.html.currentTime=0;
      audio.html.volume = 0;
      audio.html.loop = false;
      await audio.html.pause();
    } else {
      try {
        await this.nativeAudio.stop(key);
      } catch (error) {}
    }
  }

  private async saveAudioPreferenceToStorage() {
    if (this.storage.get(StorageID.soundPreference)) {
      try {
        await this.storage.remove(StorageID.soundPreference);
      } catch (error) {}
    }
    try {
      await this.storage.set(StorageID.soundPreference, this.audioOn);
    } catch (error) {}
  }
}
