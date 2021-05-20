import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ITermsOfChristianFaith } from 'src/app/models/terms-of-christian-faith/terms-of-christian-faith';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
  providedIn: 'root'
})
export class TermsOfChristianFaithService {
  public termsOfChristianFaith: Observable<ITermsOfChristianFaith[]>;

  constructor(private secureHttpClient: SecureHttpClient, private configurationService: ConfigurationService) {
  }

  public getTermsOfChristianFaithByOrganization(): Observable<ITermsOfChristianFaith[]> {
    if (!this.termsOfChristianFaith) {
      this.termsOfChristianFaith = this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/termsOfChristianFaith`).pipe(shareReplay());
    }
    return this.termsOfChristianFaith;
  }

  public getTermsOfChristianFaithBySession(sessionPublicId: string): Observable<ITermsOfChristianFaith[]> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/termsOfChristianFaith/${sessionPublicId}`);
  }
}