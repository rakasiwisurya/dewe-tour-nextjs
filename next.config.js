/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_USERNAME: "postgres",
    DB_PASSWORD: "root",
    DB_HOST: "localhost",
    DB_PORT: "5432",
    DB_NAME: "db_dewe_tour",
    TOKEN_KEY: "TStWZhXcYsGN5XsgJH3YBM04ca6qKA2Ch5ZSFS8E",
    PREFIX_IMAGE_CODE: "TRIPS",
    PREFIX_TRANSACTION_CODE: "TRSCN",
  },
};

module.exports = nextConfig;
