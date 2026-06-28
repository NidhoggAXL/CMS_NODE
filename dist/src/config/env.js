require("dotenv").config();

function getEnv(name, defaultValue) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return defaultValue;
  }
  return value;
}

function getEnvNumber(name, defaultValue) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    return defaultValue;
  }
  const num = Number(value);
  return Number.isNaN(num) ? defaultValue : num;
}

module.exports = {
  SERVER_HOST: getEnv("SERVER_HOST", "http://localhost"),
  SERVER_PORT: getEnvNumber("SERVER_PORT", 9000),
  DB_HOST: getEnv("DB_HOST", "localhost"),
  DB_PORT: getEnvNumber("DB_PORT", 3306),
  DB_USER: getEnv("DB_USER", "root"),
  DB_PASSWORD: getEnv("DB_PASSWORD", ""),
  DB_NAME: getEnv("DB_NAME", "cms"),
  DB_CONNECTION_LIMIT: getEnvNumber("DB_CONNECTION_LIMIT", 5),
  ZHIPU_API_KEY: getEnv("ZHIPU_API_KEY", ""),
};
