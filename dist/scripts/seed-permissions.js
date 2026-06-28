require("../src/config/env");
const connection = require("../src/app/database");
const { PERMISSIONS, ROLE_PERMISSION_CODES } = require("./permissions-seed-data");

async function seed() {
  try {
    console.log("开始写入权限数据...");

    await connection.query("SET FOREIGN_KEY_CHECKS = 0");
    await connection.query("TRUNCATE TABLE role_permissions");
    await connection.query("TRUNCATE TABLE permissions");
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");

    for (const permission of PERMISSIONS) {
      await connection.query(
        "INSERT INTO permissions (name, code, description) VALUES (?, ?, ?)",
        [permission.name, permission.code, permission.description]
      );
    }
    console.log(`已写入 ${PERMISSIONS.length} 条权限`);

    const [permissionRows] = await connection.query("SELECT id, code FROM permissions");
    const codeToId = new Map(permissionRows.map((row) => [row.code, row.id]));

    let rolePermissionCount = 0;
    for (const [roleId, codes] of Object.entries(ROLE_PERMISSION_CODES)) {
      for (const code of codes) {
        const permissionId = codeToId.get(code);
        if (!permissionId) continue;
        await connection.query(
          "INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)",
          [roleId, permissionId]
        );
        rolePermissionCount += 1;
      }
    }
    console.log(`已写入 ${rolePermissionCount} 条角色权限关联`);

    const [countRows] = await connection.query("SELECT COUNT(*) AS count FROM permissions");
    console.log(`数据库权限总数: ${countRows[0].count}`);
    process.exit(0);
  } catch (error) {
    console.error("权限种子数据写入失败:", error);
    process.exit(1);
  }
}

seed();
