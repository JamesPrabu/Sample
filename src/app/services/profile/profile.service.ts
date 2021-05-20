import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IUserInfo } from 'src/app/models/IUserInfo/IUserInfo';
import { ILookupDisplayRow } from 'src/app/models/managed-lookups/managed-lookups';
import { Profile } from 'src/app/models/profile/profile';
import { IProfileBackendData, ProfileFactory } from 'src/app/models/profile/profile-factory';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
    providedIn: 'root'
  })
  export class ProfileService {
    public userInfo: Observable<IUserInfo> = this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/getUserInfo`).pipe(shareReplay());

    constructor(
        private secureHttpClient: SecureHttpClient,
        private configurationService: ConfigurationService,
        private profileFactory: ProfileFactory
      ) {
      }

  public get(): Observable<Profile[]> {
    console.log('get123', this.configurationService.getApiUrl())
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/profiles`).pipe(
      map((profilesJson: any) => {
        console.log('test', profilesJson)
        return profilesJson.map((profile) => this.profileFactory.buildPersonProfile(profile));
      }));
      console.log('end')
  }

  public put(profile: Profile): Observable<void> {
    return this.secureHttpClient.put(`${this.configurationService.getApiUrl()}/profiles`, profile);
  }

  public post(profile: Profile): Observable<void> {
    return this.secureHttpClient.post(`${this.configurationService.getApiUrl()}/profiles`, profile);
  }
  
  public personSoftDelete(personId: string): Observable<{ return_code: number }> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/${personId}/personSoftDelete`);
  }
  
  public getUserInfo(): Observable<IUserInfo> {
    return this.userInfo;
  }
  
  public getProfileByPersonId(personId: string): Observable<Profile> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/${personId}`).pipe(
      map((profilesJson: IProfileBackendData) => {
        return this.profileFactory.build(profilesJson);
      }));
  }
  
  public getPersonSpiritualGifts(personId: string, organizationId: string): Observable<ILookupDisplayRow[]> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/${personId}/personSpiritualGifts/${organizationId}`);
  }

  public personSelectedAttributesMerge(personId: string, selectedItems: string[], mergeUrlPath: string): Observable<any> {
    return this.secureHttpClient.post(`${this.configurationService.getApiUrl()}/profiles/${personId}/${mergeUrlPath}`, { selectedItems: selectedItems });
  }

  public getPersonStrengths(personId: string, organizationId: string): Observable<ILookupDisplayRow[]> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/${personId}/personStrengths/${organizationId}`);
  }
  
  public getPersonInterests(personId: string, organizationId: string): Observable<ILookupDisplayRow[]> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/${personId}/personInterests/${organizationId}`);
  }

  public getPersonSkills(personId: string, organizationId: string): Observable<ILookupDisplayRow[]> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/profiles/${personId}/personSkills/${organizationId}`);
  }
  
  }