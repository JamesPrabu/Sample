export interface IEnvironment {
    production: boolean;
    apiUrl: string;
    callbackUrl: string;
    baseUrl: string;
    auth0ClientId: string;
    auth0Domain: string;
    auth0Audience: string;
    froalaEditorKey: string;
    stripePublicKey: string;
    plaidPublicKey: string;
    plaidEnvironment: string;
    appShouldRunLuckyOrange: boolean;
    duplicatePersonFuzzinessValues: { first_name: number; last_name: number; email_address: number; phone_number: number };
    shouldDisplayPayments: boolean;
    shouldDisplayConnectSessionLink: boolean;
  }
  