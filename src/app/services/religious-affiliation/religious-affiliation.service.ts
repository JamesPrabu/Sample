import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IReligiousAffiliation } from 'src/app/models/ReligiousAffiliation/religious-affiliation';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
  providedIn: 'root'
})
export class ReligiousAffiliationService {
  public religiousAffiliations: Observable<IReligiousAffiliation[]>;

  constructor(private secureHttpClient: SecureHttpClient, private configurationService: ConfigurationService) {
  }

  public getReligiousAffiliationsByOrganization(): Observable<IReligiousAffiliation[]> {
    if (!this.religiousAffiliations) {
      this.religiousAffiliations = this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/religiousAffiliation`).pipe(shareReplay());
    }
    return this.religiousAffiliations;
  }

  public getReligiousAffiliationsBySession(sessionPublicId: string): Observable<IReligiousAffiliation[]> {
    return this.secureHttpClient.get(`${this.configurationService.getApiUrl()}/religiousAffiliation/${sessionPublicId}`);
  }
}