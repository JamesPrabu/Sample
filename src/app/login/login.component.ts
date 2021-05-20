import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public auth: AuthService) {
    /// alert('I am login')
    
    
   }

  ngOnInit() {
    const token = localStorage.getItem('idToken');
    if (!token) {
      this.auth.login('home');
    }
    
    console.log('home return')
    // this.router.navigateByUrl('home');
  }

}
