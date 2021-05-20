import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

@Injectable({
    providedIn: 'root'
  })
  
  export class ConfigurationService {

    public getApiUrl() {
      return environment.apiUrl;
    }
    
    public getBaseUrl() {
        return environment.baseUrl;
      }
      
  }
