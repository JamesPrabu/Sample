import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { StaticType } from 'src/app/models/static-type/static-type';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
  providedIn: 'root'
})
export class StaticTypesService {
  public staticLookUpTypes: StaticType[];
  public audience: Observable<StaticType[]> = this.httpClient.get(`${this.configurationService.getApiUrl()}/staticTypes/audience`).pipe(shareReplay());
  constructor(private httpClient:SecureHttpClient, private configurationService: ConfigurationService) { }

  public get(lookupType:string):Observable<StaticType[]> {
    return this.httpClient.get(`${this.configurationService.getApiUrl()}/staticTypes/${lookupType}`);
  }

  public getAudience():Observable<StaticType[]> {
    return this.audience;
  }
}
