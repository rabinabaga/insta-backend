const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");


dotenv.config({ path: path.join(__dirname, "../.env") })

const envVarsSchema = joi
  .object()
  .keys({
    PORT: joi.number().required(),
    MONGO_DB_URI: joi.string().required(),
    JWT_SECRET: joi.string().required().description("My api secret"),
    REFRESH_JWT_SECRET: joi
      .string()
      .required()
      .description("My refresh api secret"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  MONGO_DB_URI: envVars.MONGO_DB_URI,
  PORT: envVars.PORT,
  JWT_SECRET: envVars.JWT_SECRET,
  REFRESH_JWT_SECRET: envVars.REFRESH_JWT_SECRET,
};
