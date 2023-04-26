import pgPromise from "pg-promise";

const pgp = pgPromise({
  /* Initialization Options */
});

export const db = pgp(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);
