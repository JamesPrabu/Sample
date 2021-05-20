import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

// @Injectable({
//   providedIn: 'root'
// })
export class HeaderTitleService {
  public title:string = '';
  public myName:string = 'James';
  public lastName:string = 'Prabu';
  constructor(public title1: Title) { }
}
