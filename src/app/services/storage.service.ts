import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private store: Storage) {
    this.init();
  }

  async init() {
    try {
      const storage = await this.store.create();
      this.storage = storage;
    } catch (error) {}
  }

  public async set(key: string, value: any): Promise<any> {
    try {
      return await this.storage?.set(key, value);
    } catch (error) {}
  }

  public async get(key: string): Promise<any> {
    try {
      return await this.storage.get(key);
    } catch (error) {}
  }

  public async remove(key: string): Promise<any> {
    try {
      return await this.storage?.remove(key);
    } catch (error) {}
  }
}
