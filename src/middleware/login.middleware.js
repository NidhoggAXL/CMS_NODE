const {
  NAME_OR_PASSWORD_NOT_NULL
} = require("../config/error");
const md5Password = require("../utils/md5-password");

// 用户名和密码校验
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 校验名字和密码不为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_NOT_NULL, ctx);
  }

  // 执行下一个中间件
  await next();
};

// 密码加密操作
const handleLoginPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
};

module.exports = {
  verifyLogin,
  handleLoginPassword,
};
