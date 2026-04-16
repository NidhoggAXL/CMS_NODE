const {
  NAME_IS_ALREADY_EXISTS,
  NAME_OR_PASSWORD_NOT_NULL,
  PHONE_FORMAT_ERROR,
} = require("../config/error");
const usersService = require("../service/users.service");
const md5Password = require("../utils/md5-password");

// 用户名和密码校验
const verifyUser = async (ctx, next) => {
  const { name, password, realname, cellphone } = ctx.request.body;

  // 校验必填字段
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_NOT_NULL, ctx);
  }

  // 校验真实姓名和手机号（如果提供了的话）
  if (realname && realname.trim().length === 0) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_NOT_NULL, ctx);
  }

  if (cellphone && !/^1[3-9]\d{9}$/.test(cellphone)) {
    return ctx.app.emit("error", PHONE_FORMAT_ERROR, ctx);
  }

  // 查询数据库是否存在相同的用户名（用户名是否注册过）
  const result = await usersService.getUserByName(name);
  if (result.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }

  // 执行下一个中间件
  await next();
};

// 密码加密操作
const handlePassword = async (ctx, next) => {
  try {
    const { password } = ctx.request.body;
    ctx.request.body.password = md5Password(password);
  } catch (error) {
    console.log(error);
  }
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
