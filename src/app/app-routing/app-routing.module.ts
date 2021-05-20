import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { HomeComponent } from '../components/home/home.component';
import { HeaderBarComponent } from '../components/header-bar/header-bar.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LoginComponent } from '../login/login.component';
import { CallbackComponent } from '../callback/callback.component';
import { ProfileResolver } from '../resolvers/profile/profile-resolver';

const routes: Routes = [

  {
    path: '',
    // component: LoginComponent,
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'head',
    component: HeaderBarComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
    // redirectTo: '/'
  },  
  { 
    path: 'findPeople',
    component: PeopleComponent,
    resolve : {profiles: ProfileResolver}
  },
  { 
    path: 'navBar',
    component: NavBarComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    console.log('Calling People');
  }
 }
