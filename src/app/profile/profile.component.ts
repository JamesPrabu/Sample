import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  // template: `test`
  // styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) {
    this.router.navigateByUrl('home');
    console.log('Profile loaded')
   }

  ngOnInit() {
  }

}