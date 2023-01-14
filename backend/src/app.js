import rout from "./api/index.js";
import express, { urlencoded } from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

export const app = express();

app.use(cors());
app.use("/api", rout);
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

// Client for connecting to a postgresql database
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
});

pool.on("connect", () => {
  console.log("connected to the Database");
});

pool.connect((err, client, done) => {
  const createQuerry = `
CREATE TABLE IF NOT EXISTS files (
    file_name varchar,
    size float,
    download_link varchar,
    uploaded_time timestamp
);
`;
  client.query(createQuerry, (error, result) => {
    done();
    if (error) {
      console.log(error);
    }
    console.log("Database created successfully");
  });
});

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

app.get("/", (request, response) => {
  response.send("Test");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
