const mysql = require("mysql2");

// 创建连接池
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "yrm1999.1203",
  database: "cms",
  connectionLimit: 5,
});

// 建立连接是否成功
pool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败", err);
    return
  } 

  // 测试连接
  connection.connect(err => {
    if (err) {
      console.log("数据库连接失败", err);
      return
    } else {
      console.log("数据库连接成功")
    }
  })
});

// 获取连接对象（promise）
const connection = pool.promise();

module.exports = connection;
