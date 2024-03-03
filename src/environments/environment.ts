// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};
export const TABLE_PAGINATION_CONFIGS = {
  total: null,
  firstRecord: 1,
  lastRecord: 10,
  perPage: 10,
  page: 1,
  pageSizes: [5, 10, 25, 50, 100, 250, 500],
  maxSize: 4,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
