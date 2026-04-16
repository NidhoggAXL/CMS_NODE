const connection = require("../app/database");

class LoginService {
  // 验证用户登录信息
  async verifyUser(name, password) {
    const statement ='SELECT * FROM `users` WHERE name = ? AND password = ?';
    const [result] = await connection.query(statement, [name, password]);
    return result;
  }

  // 获取用户信息（不包含密码）
  async getUserInfo(name) {
    const statement ='SELECT * FROM `users` WHERE name = ?';
    const [result] = await connection.query(statement, [name]);
    return result;
  }
}

module.exports = new LoginService();
