const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const automateRouter = require("../router/index.js");

// 创建app
const app = new Koa();

// 使用中间件
app.use(bodyParser());

app.use(async (ctx, next) => {
  // 开启CORS
  ctx.set("Access-Control-Allow-Origin", "*"); //  允许任何来源的域访问，"*"表示所有域
  ctx.set(
    "Access-Control-Allow-Headers",
    "Accept, Accept-Encoding, Accept-Language,Connection, Content-Type,Host,Origin,Referer,User-Agent,Authorization",
  ); // 允许头携带的信息(现代浏览器可以省略)
  ctx.set("Access-Control-Allow-Credentials", true); //  允许跨域请求携带认证信息(如cookies)
  ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS"); //  允许客户端使用的HTTP方法
  if (ctx.method == "OPTIONS") {
    ctx.status = 204;
  } else {
    await next();
  }
});

// 注册路由
automateRouter(app);

// 将app导出
module.exports = app;
