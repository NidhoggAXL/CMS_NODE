require("./config/env");

const app = require("./app/index");
const { SERVER_PORT } = require("./config/server.js");
require("./utils/handle-error");

app.listen(SERVER_PORT, () => {
  console.log(`Koa服务器${SERVER_PORT}启动成功`);
});
