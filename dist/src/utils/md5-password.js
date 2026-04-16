const crypto = require("crypto");

const md5Password = (password) => {
  // 确保password是字符串类型
  const passwordStr = String(password);
  // 选择md5加密方式
  const md5 = crypto.createHash("md5");
  // 更新password，并且使用digest("hex")指定输出16进制格式
  const md5pwd = md5.update(passwordStr).digest("hex");
  return md5pwd;
};

module.exports = md5Password;
