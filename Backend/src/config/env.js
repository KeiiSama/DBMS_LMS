require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "Ngocquynguyen1",
  DB_DATABASE: process.env.DB_DATABASE || "library",
  SECRET_JWT: process.env.SECRET_JWT || "",
};
