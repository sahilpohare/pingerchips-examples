const express = require("express");
const app = express();
const http = require("http").createServer(app);
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.json());

http.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});