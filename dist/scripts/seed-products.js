require("../src/config/env");
const connection = require("../src/app/database");
const { categories, goods } = require("./products-seed-data");

async function seed() {
  try {
    console.log("开始写入商品分类与商品数据...");

    await connection.query("SET FOREIGN_KEY_CHECKS = 0");
    await connection.query("TRUNCATE TABLE goods");
    await connection.query("TRUNCATE TABLE categories");
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    for (const category of categories) {
      await connection.query(
        "INSERT INTO categories (id, name, parent_id, sort) VALUES (?, ?, ?, ?)",
        [category.id, category.name, category.parent_id, category.sort]
      );
    }
    console.log(`已写入 ${categories.length} 个分类`);

    for (const item of goods) {
      await connection.query(
        `INSERT INTO goods (name, category_id, price, stock, description, image)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [item.name, item.category_id, item.price, item.stock, item.description, item.image]
      );
    }
    console.log(`已写入 ${goods.length} 条商品`);

    const [countRows] = await connection.query("SELECT COUNT(*) AS count FROM goods");
    console.log(`数据库商品总数: ${countRows[0].count}`);
    process.exit(0);
  } catch (error) {
    console.error("种子数据写入失败:", error);
    process.exit(1);
  }
}

seed();
