import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private lastName: string = 'prabu';
  constructor(public router: Router = null, public modalService: NgbModal = null, public title?: Title, public auth?: AuthService) { // , public auth?: AuthService
    // this.router.navigateByUrl('login');
  }
  
  ngOnInit() {
    const t = 10;
    // alert('home alone');
    this.title.setTitle('Home - Local');
    // this.auth.login('/home');
  }
  firstName: string = 'james';
  public navigateFindPeople() {
    // this.spinner.show(); 
    console.log('Calling People2');
    this.router.navigateByUrl('findPeople');
  }

  toggle(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }  

  private logout() {
    // alert('logout')
    this.auth.logout();
  }

}
