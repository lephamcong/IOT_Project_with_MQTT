const emqxRoute = require("./emqxRoute");
const showRoute = require("./showRoute");

function route(app) {
  app.use("/emqx", emqxRoute);
  app.use("/show", showRoute);
}
module.exports = route;
