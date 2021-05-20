import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderTitleService } from 'src/app/services/header-title.service';

@Component({
  selector: 'header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  constructor(public router: Router, public headerTitleService: HeaderTitleService) { }

  ngOnInit() {
  }

  gotoHome() {
    this.router.navigateByUrl('');
  }

  toggle(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
    
}
