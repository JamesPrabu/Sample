import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deactivate-lightbox',
  templateUrl: './deactivate-lightbox.component.html',
  styleUrls: ['./deactivate-lightbox.component.scss']
})
export class DeactivateLightboxComponent implements OnInit {

  constructor(public ngbActiveModal: NgbActiveModal) { }

  ngOnInit() {
  }

  proceedToNavigate() {
    this.ngbActiveModal.close();
    return true;
  }

  cancelNavigation() {
    this.ngbActiveModal.close();
    return false;
  }

}
