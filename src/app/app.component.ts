import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public tax = 50;
  constructor() {// public authService: AuthService
    // alert('I am App')
    // authService.logout();
    // authService.login();
    // this.router.navigateByUrl('home');
    
    // let add = function(x) {
    //   return x + this.tax;
    // }
    // console.log('add ', add(100));

    // let add1 = x => (x - 10) + 5
    // console.log('add1 ', add1(100));
    

    // console.log('add1 ', (() => {return 'message12 ' + this.tax})());

    // console.log(total(100, 10, this.tax));
    // console.log(['a','b','c'].map(x => console.log(this)))

    // const final = (amount, discount, tax) => { 
    //   const amount1 = amount - discount;
    //   return amount1 + tax;
    // }

    // console.log(final(1000, 100, 50));


  }


};

function total (amount, discount, tax) : number {
  const amount1 = amount - discount;
  return amount1 + tax;
}