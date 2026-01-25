export default () => ({
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || 30 * 60,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 14 * 24 * 60 * 60,
    hashSaltRounds: process.env.PASSWORD_HASH_SALT_ROUNDS || 12,
    oauthSuccessRedirectUrl: process.env.OAUTH_SUCCESS_REDIRECT_URL,
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    },
    facebook: {
      clientId: process.env.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
      callbackUrl: process.env.FACEBOOK_OAUTH_CALLBACK_URL,
      // TODO: Get Facebook oauth keys from their portal
    },
  },
  database: {
    connectionString: process.env.MONGO_CONNECTION_STRING,
  },
  mail: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
});
