import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class SecureHttpClient {
  
    constructor(
      private httpClient: HttpClient,
      private router: Router
    ) {
    }

    public post(url: string, postBody: any): Observable<any> {
      return this.httpClient.post(url, postBody, this.getHttpOptions()).pipe(
        catchError((err) => this.errorHandler(err))
      );
    }
  
    public patch(url: string, patchBody: any): Observable<any> {
      return this.httpClient.patch(url, patchBody, this.getHttpOptions()).pipe(
        catchError((err) => this.errorHandler(err))
      );
    }

    public put(url: string, putBody: any): Observable<any> {
      return this.httpClient.put(url, putBody, this.getHttpOptions()).pipe(
        catchError((err) => this.errorHandler(err))
      );
    }
    
    public get(url: string): Observable<any> {
        return this.httpClient.get(url, this.getHttpOptions()).pipe(
          catchError((err) => this.errorHandler(err))
        );
      }

      private errorHandler(error: HttpErrorResponse) {
        if (error.status === 302) {
          this.router.navigate(['userIsBlocked']);
        }
        if (error.status === 401) {
          this.router.navigate(['logout']);
        }
        return throwError(error);
      }
      
  private getHttpOptions() {
    // const accessToken = localStorage.getItem(LocalStorageKeys.Authentication.AccessToken);
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${'accessToken'}` })
    };
  }

}