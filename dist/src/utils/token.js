const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// 读取私钥和公钥
const privateKeyPath = path.join(__dirname, "../config/key/private.key");
const publicKeyPath = path.join(__dirname, "../config/key/public.key");

const privateKey = fs.readFileSync(privateKeyPath, "utf8").trim();
const publicKey = fs.readFileSync(publicKeyPath, "utf8").trim();

// 生成 token
const generateToken = (userId, username, roleId) => {
  // 过期时间，这里设置为 24 小时
  const expiresIn = "24h";

  // 创建 payload
  const payload = {
    id: userId,
    name: username,
    roleId: roleId ?? null,
  };

  // 使用私钥生成 token
  const token = jwt.sign(payload, privateKey, {
    expiresIn,
    algorithm: "RS256", // 使用 RS256 算法
  });

  return token;
};

// 验证 token
const verifyToken = (token) => {
  try {
    // 使用公钥验证 token
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"], // 指定算法
    });

    return decoded;
  } catch (error) {
    console.error("Token 验证失败:", error.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
