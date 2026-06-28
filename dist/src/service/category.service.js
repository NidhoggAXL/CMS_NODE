const connection = require("../app/database");

class CategoryService {
  async getAllCategories() {
    const statement = `SELECT id, name, parent_id, sort, create_at, update_at FROM categories ORDER BY sort ASC, id ASC`;
    const [rows] = await connection.query(statement);
    return rows;
  }

  async getCategoryById(id) {
    const statement = `SELECT id, name, parent_id, sort, create_at, update_at FROM categories WHERE id = ?`;
    const [rows] = await connection.query(statement, [id]);
    return rows[0];
  }

  async getCategoryByName(name, parentId = null) {
    let statement = `SELECT * FROM categories WHERE name = ?`;
    const params = [name];
    if (parentId !== null) {
      statement += ` AND parent_id = ?`;
      params.push(parentId);
    }
    const [rows] = await connection.query(statement, params);
    return rows;
  }

  async createCategory(category) {
    const { name, parent_id = 0, sort = 1 } = category;
    const statement = `INSERT INTO categories (name, parent_id, sort) VALUES (?, ?, ?)`;
    const [result] = await connection.query(statement, [name, parent_id, sort]);
    return this.getCategoryById(result.insertId);
  }

  async updateCategory(id, category) {
    const { name, parent_id = 0, sort = 1 } = category;
    const statement = `UPDATE categories SET name = ?, parent_id = ?, sort = ? WHERE id = ?`;
    await connection.query(statement, [name, parent_id, sort, id]);
    return this.getCategoryById(id);
  }

  async deleteCategory(id) {
    const [children] = await connection.query(`SELECT COUNT(*) AS count FROM categories WHERE parent_id = ?`, [id]);
    if (children[0].count > 0) {
      throw new Error("请先删除子分类");
    }
    const [goodsCount] = await connection.query(`SELECT COUNT(*) AS count FROM goods WHERE category_id = ?`, [id]);
    if (goodsCount[0].count > 0) {
      throw new Error("该分类下仍有商品，无法删除");
    }
    const statement = `DELETE FROM categories WHERE id = ?`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }
}

module.exports = new CategoryService();
