import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class IonLoaderService {

  constructor(private readonly loadingController: LoadingController) {}

  async createLoader(): Promise<boolean> {
    try {
      const res = await this.loadingController.create({
        cssClass:'loader-css-class',
        duration: 4000
      });

      res.present();
      return true;
    } catch (error) {}
  }

  async dismissLoader() {
    try {
      await this.loadingController.dismiss();
    } catch (error) {}
  }
}
