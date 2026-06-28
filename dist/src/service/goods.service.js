const connection = require("../app/database");

class GoodsService {
  async getGoodsList({ offset = 0, limit = 12, name = "", category_id = "", minPrice = "", maxPrice = "" } = {}) {
    let statement = `
      SELECT id, name, category_id, price, stock, description, image, create_at, update_at
      FROM goods
      WHERE 1=1
    `;
    const params = [];

    if (name) {
      statement += ` AND name LIKE ?`;
      params.push(`%${name}%`);
    }
    if (category_id) {
      statement += ` AND category_id = ?`;
      params.push(category_id);
    }
    if (minPrice !== "" && minPrice !== null && minPrice !== undefined) {
      statement += ` AND price >= ?`;
      params.push(minPrice);
    }
    if (maxPrice !== "" && maxPrice !== null && maxPrice !== undefined) {
      statement += ` AND price <= ?`;
      params.push(maxPrice);
    }

    statement += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [rows] = await connection.query(statement, params);
    return rows;
  }

  async getGoodsCount({ name = "", category_id = "", minPrice = "", maxPrice = "" } = {}) {
    let statement = `SELECT COUNT(*) AS count FROM goods WHERE 1=1`;
    const params = [];

    if (name) {
      statement += ` AND name LIKE ?`;
      params.push(`%${name}%`);
    }
    if (category_id) {
      statement += ` AND category_id = ?`;
      params.push(category_id);
    }
    if (minPrice !== "" && minPrice !== null && minPrice !== undefined) {
      statement += ` AND price >= ?`;
      params.push(minPrice);
    }
    if (maxPrice !== "" && maxPrice !== null && maxPrice !== undefined) {
      statement += ` AND price <= ?`;
      params.push(maxPrice);
    }

    const [rows] = await connection.query(statement, params);
    return rows[0].count;
  }

  async getGoodsById(id) {
    const statement = `
      SELECT id, name, category_id, price, stock, description, image, create_at, update_at
      FROM goods WHERE id = ?
    `;
    const [rows] = await connection.query(statement, [id]);
    return rows[0];
  }

  async createGoods(goods) {
    const { name, category_id, price, stock, description, image } = goods;
    const statement = `
      INSERT INTO goods (name, category_id, price, stock, description, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(statement, [
      name,
      category_id,
      price,
      stock,
      description,
      image,
    ]);
    return this.getGoodsById(result.insertId);
  }

  async updateGoods(id, goods) {
    const { name, category_id, price, stock, description, image } = goods;
    const statement = `
      UPDATE goods
      SET name = ?, category_id = ?, price = ?, stock = ?, description = ?, image = ?
      WHERE id = ?
    `;
    await connection.query(statement, [name, category_id, price, stock, description, image, id]);
    return this.getGoodsById(id);
  }

  async deleteGoods(id) {
    const statement = `DELETE FROM goods WHERE id = ?`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }
}

module.exports = new GoodsService();
