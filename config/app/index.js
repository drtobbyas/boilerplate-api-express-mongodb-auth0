module.exports = {
  db: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },

  env: {
    name: process.env.NODE_ENV || 'local',
    port: process.env.PORT || 3000,
    instancesCount: process.env.NODE_INSTANCES_COUNT,
  },

  app: {
    isLoggerEnabled: parseInt(process.env.APP_LOGGER_ENABLED, 10) || 0,
  },

  auth: {
    authProvider: {
      domain: process.env.AUTH_ZERO_DOMAIN,
      clientId: process.env.AUTH_ZERO_CLIENT_ID,
      secret: process.env.AUTH_ZERO_SECRET,
      tokenSecretUri: process.env.AUTH_ZERO_TOKEN_SECRET_PATH,
      issuer: process.env.AUTH_ZERO_ISSUER,
      audience: process.env.AUTH_ZERO_AUDIENCE,
    },
  },

  mail: {
    auth: {
      user: process.env.MAIL_SERVER_AUTH_USER,
      pass: process.env.MAIL_SERVER_AUTH_PASS,
    },
    host: process.env.MAIL_SERVER_HOST,
    port: process.env.MAIL_SERVER_PORT,
  },

  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_REGION,
    bucket: {
      public: process.env.AWS_BUCKET_NAME,
    },
  },
};
