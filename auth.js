const okta = require('@okta/okta-sdk-nodejs');
const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;

// Define an Okta client so any user management tasks can be performed
const oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
});

// Define the OpenID Connect client
const oidc = new ExpressOIDC({
  appBaseUrl: process.env.HOST_URL,
  issuer: process.env.OKTA_ORG_URL + '/oauth2/default',
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/callback`,
  scope: 'openid profile',
  routes: {
    loginCallback: {
      path: '/callback'
    }
  }
});

module.exports = { oidc, oktaClient };