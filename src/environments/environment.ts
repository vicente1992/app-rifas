// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  fbId: '',
  api: 'http://localhost:4000/api',
  daysTokenExpire: 4,
  secondNotification: 4500,
  googleApiKeyPlace: '',
  vapid: '',
  stripe_pk: '',
  shareFacebook: 'https://www.facebook.com/sharer/sharer.php?u=',
  amounts: {
    min: 100,
    max: 9999
  },
  sentry: null,
  hash: true,
  prefixTag: '💪 Apoyalocales.com',
  fbRedirect: 'callback/facebook',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
