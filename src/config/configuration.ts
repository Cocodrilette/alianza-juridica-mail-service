export default () => ({
  hostAPI: process.env.HOST_API,
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  apiKey: process.env.X_API_KEY,
  emailPassword: process.env.APPLICATION_SPECIFIC_EMAIL_PASSWORD,
});
