import rout from "./api/index.js";
import express, { urlencoded } from "express";
import cors from "cors";
import Client from 'pg/lib/client.js'

export const app = express();

app.use(cors());
app.use("/api", rout);
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

// Client for connecting to a postgresql database
export const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
/*export const getClient = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  await client.connect((err) => {
    if (err){
      throw err;
    }
    console.log("Connection succesfully done");
  });
  return client;
}*/

await client.connect((err) => {
  if (err){
    throw err;
  }
  console.log("Connection succesfully done");
});

const createQuerry = `
CREATE TABLE IF NOT EXISTS files (
    file_name varchar,
    size float,
    download_link varchar,
    uploaded_time timestamp
);
`;

await client.query(createQuerry, (error, response) => {
    error ? console.log(error) : console.log("Table is successfully created");
    client.end;
  });

app.get("/", (request, response) => {
  response.send("Test");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
