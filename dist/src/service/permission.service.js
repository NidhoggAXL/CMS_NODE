const connection = require("../app/database");

class PermissionService {
  async getAllPermissions() {
    const statement = `
      SELECT id, name, code, description, create_at, update_at
      FROM permissions
      ORDER BY id ASC
    `;
    const [rows] = await connection.query(statement);
    return rows;
  }

  async getPermissionCodesByRoleId(roleId) {
    const statement = `
      SELECT p.code
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
      ORDER BY p.id ASC
    `;
    const [rows] = await connection.query(statement, [roleId]);
    return rows.map((row) => row.code);
  }

  async getPermissionIdsByRoleId(roleId) {
    const statement = `
      SELECT permission_id
      FROM role_permissions
      WHERE role_id = ?
    `;
    const [rows] = await connection.query(statement, [roleId]);
    return rows.map((row) => row.permission_id);
  }

  async roleHasPermission(roleId, permissionCode) {
    if (!roleId || !permissionCode) return false;

    const statement = `
      SELECT COUNT(*) AS count
      FROM role_permissions rp
      JOIN permissions p ON rp.permission_id = p.id
      WHERE rp.role_id = ? AND p.code = ?
    `;
    const [rows] = await connection.query(statement, [roleId, permissionCode]);
    return rows[0].count > 0;
  }

  async replaceRolePermissions(roleId, permissionIds = []) {
    const conn = await connection.getConnection();

    try {
      await conn.beginTransaction();
      await conn.query("DELETE FROM role_permissions WHERE role_id = ?", [roleId]);

      if (permissionIds.length > 0) {
        const values = permissionIds.map((permissionId) => [roleId, permissionId]);
        await conn.query(
          "INSERT INTO role_permissions (role_id, permission_id) VALUES ?",
          [values]
        );
      }

      await conn.commit();
      return this.getPermissionIdsByRoleId(roleId);
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  }
}

module.exports = new PermissionService();
