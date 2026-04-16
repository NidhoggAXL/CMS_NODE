//  引入dotenv模块，用于从.env文件加载环境变量到process.env中
const dotenv = require("dotenv");

dotenv.config();
//  加载环境变量配置文件 dotenv 是一个 Node.js 模块，它从 .env 文件加载环境变量到 process.env 中
// console.log(process.env.SERVER_PROT) //8000

// 从process.env里面解构出来SERVER_PROT，并导出
module.exports = { SERVER_PORT, SERVER_HOST } = process.env;
