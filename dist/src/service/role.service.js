const connection = require("../app/database");

class RoleService {
  // 根据ID查询角色信息
  async getRoleById(id) {
    const statement = `SELECT * FROM roles WHERE id = ?`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }

  // 获取角色列表
  async getRolesList(offset = 0, limit = 10) {
    const statement = `SELECT id, name, intro, create_at as createAt, update_at as updateAt FROM roles LIMIT ? OFFSET ?`;
    const [result] = await connection.query(statement, [limit, offset]);
    return result;
  }

  // 获取角色总数
  async getRolesCount() {
    const statement = `SELECT COUNT(*) as count FROM roles`;
    const [result] = await connection.query(statement);
    return result[0].count;
  }

  // 创建角色
  async createRole(roleData) {
    const { name, intro } = roleData;
    const statement = `INSERT INTO roles (name, intro) VALUES (?, ?)`;
    const [result] = await connection.query(statement, [name, intro]);
    return result;
  }

  // 根据名称查询角色
  async getRoleByName(name) {
    const statement = `SELECT * FROM roles WHERE name = ?`;
    const [result] = await connection.query(statement, [name]);
    return result;
  }

  // 更新角色
  async updateRole(roleId, roleData) {
    const { name, intro } = roleData;

    // 构建动态更新语句
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push(`name = ?`);
      values.push(name);
    }

    if (intro !== undefined) {
      fields.push(`intro = ?`);
      values.push(intro);
    }

    if (fields.length === 0) {
      throw new Error("至少需要更新一个字段");
    }

    const statement = `UPDATE roles SET ${fields.join(", ")} WHERE id = ?`;
    values.push(roleId);

    const [result] = await connection.query(statement, values);
    return result;
  }

  // 根据ID获取角色信息
  async getRoleInfoById(id) {
    const statement = `SELECT id, name, intro, create_at as createAt, update_at as updateAt FROM roles WHERE id = ?`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }

  // 删除角色
  async deleteRole(roleId) {
    const statement = `DELETE FROM roles WHERE id = ?`;
    const [result] = await connection.query(statement, [roleId]);
    return result;
  }
}

module.exports = new RoleService();
