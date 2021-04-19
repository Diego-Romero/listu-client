[![Build Status](https://travis-ci.com/Diego-Romero/lists-ui.svg?branch=master)](https://travis-ci.com/Diego-Romero/lists-ui)

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

This is the client for the lists app developed by Diego Romero for my Udacity capstone project, [the backend](https://github.com/Diego-Romero/sl-be) has been developed using serverless framework and all the infrastructure currently lives in AWS.

Authentication has been done with Auth0, so in order to boot the project locally you will need to create your own Auth0 app and set it up locally. You will need to create a .env file at root level with the following information.

```bash
REACT_APP_AUTH_0_DOMAIN=xxx
REACT_APP_AUTH_0_CLIENT_ID=xxx
REACT_APP_SERVER_URL=http://localhost:4000/dev
```

You will also need to install the dependencies:

```bash
yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.
