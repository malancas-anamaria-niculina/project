import rout from "./api/index.js";
import express, { urlencoded } from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const app = express();

app.use(cors());
app.use("/api", rout);
app.use(express.json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));

app.get("/", (request, response) => {
  response.send("Test");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
