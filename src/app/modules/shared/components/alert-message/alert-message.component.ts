import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/models/alert-message/alert-message';
import { AlertMessageService } from 'src/app/services/alert-message/alert-message.service';


@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {
  public alert: Alert;
  public showAlert: boolean;

  constructor(private alertMessageService: AlertMessageService) {
    // alert("AlertMessageComponent called")
    this.alertMessageService.getAlert().subscribe((newAlert: Alert) => {
      this.alert = newAlert;
      this.showAlert = (this.alert.duration !== 0);

      if (this.alert.duration > 0) {
        setTimeout(() => {
          this.alert.message = null;
          this.showAlert = false;
        }, this.alert.duration);
      }
    });
  }

  public ngOnInit() {
  }
}