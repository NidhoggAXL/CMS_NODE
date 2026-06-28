const mysql = require("mysql2");
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONNECTION_LIMIT,
} = require("../config/env");

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: DB_CONNECTION_LIMIT,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败", err);
    return;
  }

  connection.connect((connectErr) => {
    if (connectErr) {
      console.log("数据库连接失败", connectErr);
      return;
    }
    console.log("数据库连接成功");
  });
});

const connection = pool.promise();

module.exports = connection;
