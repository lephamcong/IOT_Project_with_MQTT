const emqxRoute = require("./emqx.routes");
const webRoute = require("./web.routes");

function route(app) {
  app.use("/emqx", emqxRoute);
  app.use("/", webRoute);
}
module.exports = route;
