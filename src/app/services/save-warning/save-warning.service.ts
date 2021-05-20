import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeactivateLightboxComponent } from 'src/app/modules/shared/components/deactivate-lightbox/deactivate-lightbox.component';

@Injectable({
  providedIn: 'root'
})
export class SaveWarningService {
  constructor(public modalService: NgbModal, public dialog?: any) {
  }

  public showWarningPopup(activeModal: NgbActiveModal, isDirty: boolean) {
    if (isDirty) {
      const deactivateLightbox = this.modalService.open(DeactivateLightboxComponent, {
        backdrop: 'static',
        keyboard: false,
        centered: true,
        size: 'lg',
        windowClass: 'z-index',
        backdropClass:'z-index'
      });

      deactivateLightbox.result.then(() => {
        activeModal.dismiss();
      });
    } else {
      activeModal.dismiss();
    }
  }

  // public showWarningPopupForDialog(dialogRef: MatDialogRef<any>, isDirty: boolean) {
  //   if (isDirty) {
  //     const deactivateLightbox = this.modalService.open(DeactivateLightboxComponent, {
  //       backdrop: 'static',
  //       keyboard: false,
  //       centered: true,
  //       size: 'lg'
  //     });

  //     deactivateLightbox.result.then(() => {
  //       dialogRef.close();
  //     }, () => { });
  //   } else {
  //     dialogRef.close();
  //   }
  // }

  // public showWarningPopupForMatDialog(dialogRef: MatDialogRef<any>, isDirty: boolean) {
  //   if (isDirty) {
  //     this.dialog.open(DeactivateAlertLightboxComponent, {
  //       width: '50%',
  //       autoFocus: false,
  //       disableClose: true,
  //       hasBackdrop: true
  //     }).afterClosed().subscribe((result) => {
  //       if (result !== 'dismiss') {
  //         dialogRef.close();
  //       }
  //     });
  //   } else {
  //     dialogRef.close();
  //   }
  // }
}