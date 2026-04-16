// 导入app和其他数据
const app = require("./app/index")
const { SERVER_PORT } = require("./config/server.js")
require("./utils/handle-error")


// 启动app服务 
app.listen(SERVER_PORT, () => {
  console.log(`Koa服务器${SERVER_PORT}启动成功`)
})