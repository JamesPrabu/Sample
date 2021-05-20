import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(public router: Router) {
    // let com = new HomeComponent();
    
    alert('callback')
   }

  ngOnInit() {
    this.router.navigateByUrl('home');
  }

}
