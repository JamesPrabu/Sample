import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertTypeString } from 'src/app/models/alert-message/alert-message';


@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private subject = new Subject<Alert>();

  constructor() { }

  public show(newType: AlertTypeString, newMessage: string, newDuration: number): void {
    this.subject.next({ type: newType, message: newMessage, duration: newDuration });
  }

  public hide(): void {
    this.subject.next({ type: 'success', message: null, duration: 0 });
  }

  public getAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }
}