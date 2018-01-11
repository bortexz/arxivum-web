# Arxivum FrontEnd
This repository contains the code for the frontend of the Arxivum project. It is used along with the [Arxivum Backend](https://github.com/bertofer/arxivum-api).

## Features
This frontend allows the administrator:
- Invite new users to the platform
- Upload, modify name, delete files
- Create, modify name, delete folders
- All other normal users features

Users features:
- Download files that the admin uploaded
- Stream multimedia files while downloading
- Change password

## Technologies
This project uses [Angular4](https://github.com/angular/angular) and has been initialized with [Angular-cli](https://github.com/angular/angular-cli). Unfortunately, the webpack config needed to be [extracted](https://github.com/angular/angular-cli/issues/1656) because it was needed to include crypto-browserify. This means there is no `ng start`, but `npm run start`, and the individual dependencies of the webpack config are also found on the package.json

It also uses the [NGRX suite](https://github.com/ngrx/platform) to handle state management, and [ramda](https://github.com/ramda/ramda) for data transformation, usually in reducers but can be found elsewhere.

## Deploy
To deploy in local environment, just run `npm start`. Make sure you have an API and Tracker from the backend, as the `environment.ts` looks like (Or just change env variables to whatever):
- `api_url: process.env.API_URL || 'http://localhost:3000/api/'`
- `tracker_url: process.env.TRACKER_URL || 'http://localhost:4000/tracker/'`

You can also run `npm build` to build the artifacts to deploy.

## Docker compatibility
There is a docker image to deploy this frontend, too. But because of the needed customization of the parameters of the Backend, this image first builds the artifacts, and then redeploys. It is useful for quick test iterations, or if you don't mind rebuilding each time you deploy, but might not be the best option for big infrastructures.

## License

Copyright 2017 Alberto Fernandez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
