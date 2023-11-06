const app = express();
const http = require("http").createServer(app);

app.use(express.static("public"));

http.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});