export default () => ({
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || 30 * 60,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 14 * 24 * 60 * 60,
    hashSaltRounds: process.env.PASSWORD_HASH_SALT_ROUNDS || 12,
  },
  database: {
    connectionString: process.env.MONGO_CONNECTION_STRING,
  },
});
