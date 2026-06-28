const loginService = require("../service/login.service");
const permissionService = require("../service/permission.service");
const { NAME_IS_MISTAKE, PASSWORD_IS_MISTAKE } = require("../config/error");
const { generateToken } = require("../utils/token");

class LoginController {
  async login(ctx, next) {
    // 获取用户登录信息
    const { name, password } = ctx.request.body;
    // 验证用户登录信息
    const verifyResult = await loginService.verifyUser(name, password);
    // console.log("verifyResult", verifyResult)
    if (verifyResult.length === 0) {
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

    const user = userInfo[0];
    const permissionCodes = await permissionService.getPermissionCodesByRoleId(user.role_id);

    // 生成 token
    const token = generateToken(user.id, user.name, user.role_id);

    ctx.body = {
      message: "登录成功",
      data: {
        user,
        token,
        permissions: permissionCodes,
      },
    };
  }
}

module.exports = new LoginController();
