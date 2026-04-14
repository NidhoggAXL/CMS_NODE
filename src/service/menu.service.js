const connection = require("../app/database");

class MenuService {
  // 根据角色ID获取菜单权限
  async getMenusByRoleId(roleId) {
    const statement = `
      SELECT DISTINCT m.id, m.name, m.type, m.url, m.icon, m.parent_id
      FROM menus m
      JOIN role_menus rm ON m.id = rm.menu_id
      WHERE rm.role_id = ?
      ORDER BY m.parent_id, m.id
    `;

    const [result] = await connection.query(statement, [roleId]);
    return result;
  }

  // 获取所有菜单项
  async getAllMenus() {
    const statement = `SELECT * FROM menus ORDER BY parent_id, id`;
    const [result] = await connection.query(statement);
    return result;
  }

  // 创建菜单
  async createMenu(menuData) {
    // 构建插入语句
    const statement = `
      INSERT INTO menus (name, type, url, icon, parent_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    // 准备参数，设置默认值
    const { name, type, url = "", icon = "", parent_id = 0 } = menuData;

    const [result] = await connection.query(statement, [
      name,
      type,
      url,
      icon,
      parent_id,
    ]);

    // 返回创建的菜单信息
    return {
      id: result.insertId,
      name,
      type,
      url,
      icon,
      parent_id,
    };
  }

  // 删除菜单（级联删除子菜单）
  async deleteMenu(menuId) {
    // 获取连接
    const conn = await connection.getConnection();

    try {
      // 开始事务
      await conn.beginTransaction();

      // 1. 删除子菜单
      const deleteChildrenStatement = `DELETE FROM menus WHERE parent_id = ?`;
      await conn.query(deleteChildrenStatement, [menuId]);

      // 2. 删除父菜单
      const deleteParentStatement = `DELETE FROM menus WHERE id = ?`;
      await conn.query(deleteParentStatement, [menuId]);

      // 3. 提交事务
      await conn.commit();

      return { success: true, deletedId: menuId };
    } catch (error) {
      // 回滚事务
      await conn.rollback();
      throw error;
    } finally {
      // 释放连接
      conn.release();
    }
  }

  // 更新菜单
  async updateMenu(menuId, menuInfo) {
    // 构建更新语句
    const statement = `
      UPDATE menus 
      SET name = ?, type = ?, url = ?, icon = ?, parent_id = ?
      WHERE id = ?
    `;

    // 准备参数
    const { name, type, url = "", icon = "", parent_id = 0 } = menuInfo;

    const [result] = await connection.query(statement, [
      name,
      type,
      url,
      icon,
      parent_id,
      menuId,
    ]);

    // 检查是否更新成功
    if (result.affectedRows > 0) {
      // 返回更新后的菜单信息
      return {
        id: menuId,
        name,
        type,
        url,
        icon,
        parent_id,
      };
    } else {
      throw new Error("菜单更新失败，未找到对应菜单");
    }
  }
}

module.exports = new MenuService();
