const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const app = express();
const port = 5035;

const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath)); //static file

// HTTp logger
app.use(morgan("combined"));

// template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
  res.render("home");
});
app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});
