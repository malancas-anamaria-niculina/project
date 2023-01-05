const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("Test");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
