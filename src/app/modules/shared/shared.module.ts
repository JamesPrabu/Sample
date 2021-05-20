import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeactivateLightboxComponent } from './components/deactivate-lightbox/deactivate-lightbox.component';

@NgModule({
  declarations: [AlertMessageComponent, DeactivateLightboxComponent],
  exports: [AlertMessageComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
