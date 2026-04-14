const loginService = require("../service/login.service");
const { NAME_IS_MISTAKE, PASSWORD_IS_MISTAKE } = require("../config/error");
const { generateToken } = require("../utils/token");

class LoginController {
  async login(ctx, next) {
    // 获取用户登录信息
    const { name, password } = ctx.request.body;
    // 验证用户登录信息
    const user = await loginService.verifyUser(name, password);
    // console.log("user", user)
    if (user.length === 0) {
      // 检查是用户名错误还是密码错误
      const userByName = await loginService.getUserInfo(name);
      if (userByName.length === 0) {
        return ctx.app.emit("error", NAME_IS_MISTAKE, ctx);
      } else {
        return ctx.app.emit("error", PASSWORD_IS_MISTAKE, ctx);
      }
    }

    // 登录成功，返回用户信息（不包含密码）
    const userInfo = await loginService.getUserInfo(name);
    // console.log(userInfo);

    // 生成 token
    const token = generateToken(userInfo[0].id, userInfo[0].name);

    ctx.body = {
      message: "登录成功",
      data: {
        user: userInfo[0],
        token,
      },
    };
  }
}

module.exports = new LoginController();
