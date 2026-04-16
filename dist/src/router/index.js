const fs = require("fs")

// 自动加载路由
const automateRouter = (app) => {
  // 读取当前文件下的所有文件(同步读取)
  const files = fs.readdirSync(__dirname)
  // 遍历文件
  files.forEach((file) => {
    if (!file.endsWith(".router.js")) return
    const router = require(`${__dirname}/${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

module.exports = automateRouter