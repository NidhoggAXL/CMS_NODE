const app = require("../app/index");
const {
  NAME_OR_PASSWORD_NOT_NULL,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_MISTAKE,
  PASSWORD_IS_MISTAKE,
  TOKEN_IS_NULL,
  PERMISSION_IS_NOT_ALLOW,
  PHONE_FORMAT_ERROR,
} = require("../config/error");

// 监听app的error事件
app.on("error", (err, ctx) => {
  let code = 0;
  let message = "";
  switch (err) {
    case NAME_OR_PASSWORD_NOT_NULL:
      code = -1001;
      message = "用户名或密码不能为空";
      break;
    case NAME_IS_ALREADY_EXISTS:
      code = -1002;
      message = "用户名已经被占用，请重新选择用户名！";
      break;
    case NAME_IS_MISTAKE:
      code = -1003;
      message = "用户名错误，请重新输入！";
      break;
    case PASSWORD_IS_MISTAKE:
      code = -1004;
      message = "密码错误，请重新输入！";
      break;
    case TOKEN_IS_NULL:
      code = -1005;
      message = "token不存在, 请重新登录! ";
      break;
    case PERMISSION_IS_NOT_ALLOW:
      code = -2001;
      message = "权限不足，请联系管理员！";
      break;
    case PHONE_FORMAT_ERROR:
      code = -1006;
      message = "手机号格式不正确";
      break;
    default:
      code = 500;
      message = "内部服务器错误";
      console.error("未知错误类型:", err);
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
