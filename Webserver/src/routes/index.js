const emqxRoute = require("./emqxRoute");

function route(app) {
  app.use("/emqx", emqxRoute);
}
module.exports = route;
