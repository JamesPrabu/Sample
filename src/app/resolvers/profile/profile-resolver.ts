import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile/profile';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Injectable()
export class ProfileResolver implements Resolve<Profile[]> {
    constructor(private profileService: ProfileService) {

    }
  
    resolve(activatedRoute: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Observable<Profile[]> {
      return this.profileService.get();
    }
}