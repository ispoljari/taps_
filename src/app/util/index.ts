import { Subscription } from 'rxjs';

export class Util {
  public static unsubscribe(subscriptions: Subscription[]): void {
    subscriptions.filter(Boolean)
      .forEach(subscription => subscription.unsubscribe());
  }
}
