import { Subscription } from 'rxjs';

export class SubscriptionArray {

    public subscriptions: Subscription[];
  
    constructor() {
      this.subscriptions = [];
    }
  
    public push(...subscriptions: Subscription[]): number {
      subscriptions.forEach(subscription => this.subscriptions.push(subscription));
      return this.subscriptions.length;
    }
  
    public destroy(): void {
      this.subscriptions.forEach(subscription => subscription && subscription.unsubscribe());
    }
  
  }