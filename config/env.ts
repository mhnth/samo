import 'dotenv/config';

const envVars = process.env;

const env = {
  env: envVars.NODE_ENV,
  nextAuthSecret: envVars.NEXTAUTH_SECRET,
};

export { env };
export default env;
