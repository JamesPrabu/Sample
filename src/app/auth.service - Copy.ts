import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';




interface IdToken {
  __raw: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  updated_at?: string;
  iss?: string;
  aud?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  azp?: string;
  nonce?: string;
  auth_time?: string;
  at_hash?: string;
  c_hash?: string;
  acr?: string;
  amr?: string;
  sub_jwk?: string;
  cnf?: string;
  sid?: string;
}

// declare var Auth0Lock: any;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // lock = new Auth0Lock('u9z7PGuQwRO1wqCvh3tud2qF5tpiGP1x', 'dev-mp.us.auth0.com', {});
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "dev-mp.us.auth0.com",
      client_id: "oDmVoRKUcNefEhQVdOi9mOxE7gWXekEx", // "oDmVoRKUcNefEhQVdOi9mOxE7gWXekEx", "u9z7PGuQwRO1wqCvh3tud2qF5tpiGP1x"
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router) {
    // alert('constructor')
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();

    // this.lock.on("authenticated", (authResult:any) => {
    //   localStorage.setItem('myId_token', authResult.idToken);
    // });
  }

  public authenticated() {
    return true; //  tokenNotExpired();
  }
  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // this.lock.show();
    // return;
    alert('login');
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      alert('login === ' + `${window.location.origin}/` +redirectPath)
      // Call method to log in
      const accessToken = client.getTokenSilently();
      // Promise(accessToken).then((res: [any]) => {
      //   const access = res[0];
      //   // const idToken = res[1].__raw;
      //   // const expirationDateTimeInSeconds = res[1].exp;

      //   alert ('My Access ' + access)
      // });


      // alert(JSON.stringify(accessToken));
      const tokenAndExpiry = client.getIdTokenClaims();
      // accessToken.then(user => {
      //   alert('user' + user)
      // });
      // alert ('promiss started')
      // alert('accessToken == ' + JSON.stringify(accessToken))
      // const modalClosePromise = new Promise((resolve) => {
      //   alert(JSON.stringify(resolve))
      // });

      Promise.all([accessToken, tokenAndExpiry]).then((res: [any, IdToken]) => {
        alert ('access  idToken')
        const access = res[0];
        const idToken = res[1].__raw;
        const expirationDateTimeInSeconds = res[1].exp;
        localStorage.setItem('idToken', idToken);
        console.log ('access ' , access)
        console.log ('idToken ' , idToken)
        alert('set token login');
        // alert('constructor')
      });

      // localStorage.setItem('AccessToken', accessToken.then( ));
      // alert('client  ' +  accessToken);
      // this.router.navigate(['home']);
      alert(`${window.location.origin}` + ' and ' + redirectPath)
      client.loginWithRedirect({
        returnTo: `${window.location.origin}/home`,
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath}
      });
    });
  }
   
  private handleAuthCallback() {
    alert('handleAuthCallback');
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        // alert(JSON.stringify(user));
        // alert('targetRoute ' + targetRoute)
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    // localStorage.removeItem('myId_token');
    // return;
    // alert('logout ' + `${window.location.origin}/`)
    localStorage.removeItem('idToken');
    // Ensure Auth0 client instance exists 
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "oDmVoRKUcNefEhQVdOi9mOxE7gWXekEx",
        returnTo: `${window.location.origin}`
      });
      // this.router.navigate(['']);
    });
  }

}