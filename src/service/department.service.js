const connection = require("../app/database");

class DepartmentService {
  // 获取部门列表
  async getDepartmentsList(offset = 0, limit = 10) {
    const statement = `SELECT * FROM departments LIMIT ? OFFSET ?`;
    const [result] = await connection.query(statement, [limit, offset]);
    return result;
  }

  // 获取部门总数
  async getDepartmentsCount() {
    const statement = `SELECT COUNT(*) as count FROM departments`;
    const [result] = await connection.query(statement);
    return result[0].count;
  }

  // 创建部门
  async createDepartment(department) {
    const { name, parent_id = 0, leader = null } = department;

    const statement = `INSERT INTO departments (name, parent_id, leader) VALUES (?, ?, ?)`;
    const [result] = await connection.query(statement, [
      name,
      parent_id,
      leader,
    ]);
    return result;
  }

  // 根据名称获取部门
  async getDepartmentByName(name) {
    const statement = `SELECT * FROM departments WHERE name = ?`;
    const [result] = await connection.query(statement, [name]);
    return result;
  }

  // 根据ID获取部门
  async getDepartmentById(id) {
    const statement = `SELECT * FROM departments WHERE id = ?`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }

  // 删除部门
  async deleteDepartment(id) {
    const statement = `DELETE FROM departments WHERE id = ?`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }

  // 更新部门
  async updateDepartment(id, departmentData) {
    const { name, parent_id = 0, leader = null } = departmentData;
    const statement = `UPDATE departments SET name = ?, parent_id = ?, leader = ? WHERE id = ?`;
    const [result] = await connection.query(statement, [
      name,
      parent_id,
      leader,
      id,
    ]);
    return result;
  }
}

module.exports = new DepartmentService();
