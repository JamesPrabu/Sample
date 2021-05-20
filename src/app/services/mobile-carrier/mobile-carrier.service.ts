import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileCarriers } from 'src/app/models/mobile-carrier/mobile-carrier';
import { ConfigurationService } from '../configuration/configuration.service';
import { SecureHttpClient } from '../secure-http-client/secure-http-client';

@Injectable({
  providedIn: 'root'
})
export class MobileCarrierService {
  public baseUrl: string;

  constructor(public secureHttpClient: SecureHttpClient, public configurationService: ConfigurationService) {
    this.baseUrl = configurationService.getApiUrl();
  }

  public getAll(): Observable<MobileCarriers[]> {
    return this.secureHttpClient.get(this.baseUrl + '/mobileCarrier');
  }
}