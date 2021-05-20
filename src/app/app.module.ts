import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { PeopleComponent } from './components/people/people.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { TestComponent } from './components/test/test.component';
import { PeopleNavigationBarComponent } from './components/people-navigation-bar/people-navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderTitleService } from './services/header-title.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './auth.service';
import { ConfirmDeleteRecordLightboxComponent } from './components/light-boxes/confirm-delete-record-lightbox/confirm-delete-record-lightbox.component';
import { ProfileResolver } from './resolvers/profile/profile-resolver';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from './modules/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { EditProfileLightBoxComponent } from './components/edit-profile-light-box/edit-profile-light-box.component';
import { BasicInfoTabComponent } from './components/edit-profile-light-box/basic-info-tab/basic-info-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleComponent,
    HeaderBarComponent,
    TestComponent,
    PeopleNavigationBarComponent,
    NavBarComponent,
    ProfileComponent,
    LoginComponent,
    CallbackComponent,
    ConfirmDeleteRecordLightboxComponent,
    EditProfileLightBoxComponent,
    BasicInfoTabComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbPopoverModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [HeaderTitleService, AuthService, ProfileResolver, NgxSpinnerService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDeleteRecordLightboxComponent, EditProfileLightBoxComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
