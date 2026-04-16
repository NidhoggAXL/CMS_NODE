const { TOKEN_IS_NULL } = require("../config/error");
const { verifyToken } = require("../utils/token");

// 验证 token
const verifyAuth = async (ctx, next) => {
  // 从请求头中获取 token
  const authorization = ctx.headers.authorization;
  // 检查 token 是否存在
  if (!authorization) {
    return ctx.app.emit("error", TOKEN_IS_NULL, ctx);
  }

  // 提取 token（Bearer token 格式）
  const token = authorization.replace("Bearer ", "");

  // 验证 token
  const decoded = verifyToken(token);

  if (!decoded) {
    return ctx.app.emit("error", TOKEN_IS_NULL, ctx);
  }

  // 将用户信息存储到 ctx 中，以便后续中间件使用
  ctx.user = decoded;

  // 执行下一个中间件
  await next();
};

module.exports = {
  verifyAuth,
};
