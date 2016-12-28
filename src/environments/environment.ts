// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const urljoin = require('url-join');

export const environment = {
  production: false,
  api_url: process.env.SERVER_URL ?
    urljoin(process.env.SERVER_URL, 'api') :
    'http://localhost:2000/api/',
  tracker_url: process.env.SERVER_URL ?
    urljoin(process.env.SERVER_URL, 'tracker') :
    'http://localhost:2000/tracker/'
};
