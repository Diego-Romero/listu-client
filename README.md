[![Netlify Status](https://api.netlify.com/api/v1/badges/99ff3b07-e0e3-48ea-9b8d-b1a35c3af711/deploy-status)](https://app.netlify.com/sites/listuapp/deploys)

# Listu Client

BE code can be found here: https://github.com/Diego-Romero/listu-api

In order to run the project locally, you will need to first install the necessary dependencies

```bash
yarn
```

After that you will need to create a .env file at root level, so you can include all the necessary environment variables

```bash
REACT_APP_SERVER_URL=http://localhost:8080
REACT_APP_GA_ID=your tracking number
REACT_APP_ENVIRONMENT=development
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
