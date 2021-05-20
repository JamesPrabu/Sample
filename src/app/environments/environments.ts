import { IEnvironment } from '../services/configuration/ienvironment';

export let environment: IEnvironment = {
    production: false,
    apiUrl: 'http://localhost:3002',
    callbackUrl: 'http://localhost:4200',
    baseUrl: 'http://localhost:4200',
    auth0ClientId: 'GaIaoAEM3t446bn4VRpAt2mosuW5QZbA',
    auth0Domain: 'omega-menlo.auth0.com',
    auth0Audience: 'omega-dev-api',
    froalaEditorKey: '4NC5fD4C3C3G3J3A5B-16UJHAEFZMUJOYGYQEa2d2ZJd1RAeF3C8B5E5E3D3B2G3A17A10==',
    stripePublicKey: 'pk_test_h7mPN9nYnDibA0axPenfe5LD008inuYO0a',
    plaidPublicKey: 'ff4ee5ebfef45bb65dfbf2f2074d22',
    plaidEnvironment: 'sandbox',
    appShouldRunLuckyOrange: false,
    duplicatePersonFuzzinessValues: { first_name: 0, last_name: 0, email_address: 0, phone_number: 0 },
    shouldDisplayPayments: true,
    shouldDisplayConnectSessionLink: true
  };
  