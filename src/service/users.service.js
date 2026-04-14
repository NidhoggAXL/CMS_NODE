const connection = require("../app/database");

class UsersService {
  // 创建用户
  async create(user) {
    // 获取用户信息并设置默认值
    const {
      name,
      realname = null,
      password,
      cellphone = null,
      email = null,
      avatar = null,
      enable = 1,
      department_id = null,
      role_id = null,
    } = user;

    // 预编译SQL语句
    const statement = `INSERT INTO users (name, realname, password, cellphone, email, avatar, enable, department_id, role_id) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // 执行SQL语句
    const [result] = await connection.query(statement, [
      name,
      realname,
      password,
      cellphone,
      email,
      avatar,
      enable,
      department_id,
      role_id,
    ]);

    // 返回结果
    return result;
  }

  // 判断是否存在相同的用户名（用户名是否注册过）
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?`;
    const [result] = await connection.query(statement, [name]);
    return result;
  }

  // 获取用户列表
  async getUsersList(offset = 0, limit = 10) {
    const statement = `SELECT id, name, realname, cellphone, enable, department_id, role_id, create_at as createAt, update_at as updateAt FROM users LIMIT ? OFFSET ?`;
    const [result] = await connection.query(statement, [limit, offset]);
    return result;
  }

  // 获取用户总数
  async getUsersCount() {
    const statement = `SELECT COUNT(*) as count FROM users`;
    const [result] = await connection.query(statement);
    return result[0].count;
  }

  // 删除用户
  async deleteUser(userId) {
    const statement = `DELETE FROM users WHERE id = ?`;
    const [result] = await connection.query(statement, [userId]);
    return result;
  }

  // 更新用户
  async updateUser(userId, userData) {
    // 构建动态更新语句
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(userData)) {
      if (value !== undefined && value !== null) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("至少需要更新一个字段");
    }
    // console.log(fields.join(", "))
    const statement = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(userId);

    const [result] = await connection.query(statement, values);
    return result;
  }

  // 根据ID获取用户
  async getUserById(userId) {
    const statement = `SELECT id, name, realname, cellphone, enable, department_id, role_id, create_at as createAt, update_at as updateAt FROM users WHERE id = ?`;
    const [result] = await connection.query(statement, [userId]);
    return result;
  }

  // 根据手机号获取用户
  async getUserByCellphone(cellphone) {
    const statement = `SELECT id, name, cellphone FROM users WHERE cellphone = ?`;
    const [result] = await connection.query(statement, [cellphone]);
    return result;
  }

  // 根据条件查询用户列表
  async queryUsersList(queryConditions, offset = 0, limit = 10) {
    let statement = `SELECT id, name, realname, cellphone, enable, department_id, role_id, create_at as createAt, update_at as updateAt FROM users WHERE 1=1`;
    const params = [];

    // 根据查询条件添加WHERE子句
    if (queryConditions.name) {
      statement += ` AND name LIKE ?`;
      params.push(`%${queryConditions.name}%`);
    }

    if (queryConditions.realname) {
      statement += ` AND realname LIKE ?`;
      params.push(`%${queryConditions.realname}%`);
    }

    if (queryConditions.cellphone) {
      statement += ` AND cellphone LIKE ?`;
      params.push(`%${queryConditions.cellphone}%`);
    }

    if (
      queryConditions.enable !== undefined &&
      queryConditions.enable !== null
    ) {
      statement += ` AND enable = ?`;
      params.push(queryConditions.enable);
    }

    if (queryConditions.department_id) {
      statement += ` AND department_id = ?`;
      params.push(queryConditions.department_id);
    }

    if (queryConditions.role_id) {
      statement += ` AND role_id = ?`;
      params.push(queryConditions.role_id);
    }

    // 处理日期范围查询
    if (
      queryConditions.createAt &&
      Array.isArray(queryConditions.createAt) &&
      queryConditions.createAt.length === 2
    ) {
      const startDate = new Date(queryConditions.createAt[0])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const endDate = new Date(queryConditions.createAt[1])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      statement += ` AND create_at BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    statement += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [result] = await connection.query(statement, params);
    return result;
  }

  // 根据条件查询用户总数
  async queryUsersCount(queryConditions) {
    let statement = `SELECT COUNT(*) as count FROM users WHERE 1=1`;
    const params = [];

    // 根据查询条件添加WHERE子句
    if (queryConditions.name) {
      statement += ` AND name LIKE ?`;
      params.push(`%${queryConditions.name}%`);
    }

    if (queryConditions.realname) {
      statement += ` AND realname LIKE ?`;
      params.push(`%${queryConditions.realname}%`);
    }

    if (queryConditions.cellphone) {
      statement += ` AND cellphone LIKE ?`;
      params.push(`%${queryConditions.cellphone}%`);
    }

    if (
      queryConditions.enable !== undefined &&
      queryConditions.enable !== null
    ) {
      statement += ` AND enable = ?`;
      params.push(queryConditions.enable);
    }

    if (queryConditions.department_id) {
      statement += ` AND department_id = ?`;
      params.push(queryConditions.department_id);
    }

    if (queryConditions.role_id) {
      statement += ` AND role_id = ?`;
      params.push(queryConditions.role_id);
    }

    // 处理日期范围查询
    if (
      queryConditions.createAt &&
      Array.isArray(queryConditions.createAt) &&
      queryConditions.createAt.length === 2
    ) {
      const startDate = new Date(queryConditions.createAt[0])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const endDate = new Date(queryConditions.createAt[1])
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      statement += ` AND create_at BETWEEN ? AND ?`;
      params.push(startDate, endDate);
    }

    const [result] = await connection.query(statement, params);
    return result[0].count;
  }
}

module.exports = new UsersService();
