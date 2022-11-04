// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  HOST: "http://localhost:4200",

  API_PATH: "/api/",

  USER: "/api/user",
  AUTH_SIGNIN: "/api/auth/signin",
  AUTH_SIGNUP: "/api/auth/signup",

  PIC_UPLOAD: "/api/picture/upload",
  PIC_UPLOAD_DATA: "/api/picture/uploadData",

  GET_FILE: "/api/picture/files",
  GET_ALL_PICTURE: "/api/picture/getAll",
  CHANGE_VISIBILITY: "/api/picture/changeVisibility",
  DELETE_PICTURE: "/api/picture/delete/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

