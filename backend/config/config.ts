import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

interface Config {
  development: DatabaseConfig;
  test: DatabaseConfig;
  production: DatabaseConfig;
}

const config: Config = {
  development: {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    dialect: process.env.DIALECT || "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;
