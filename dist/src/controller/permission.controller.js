const permissionService = require("../service/permission.service");

class PermissionController {
  async getAllPermissions(ctx) {
    try {
      const list = await permissionService.getAllPermissions();
      ctx.body = {
        code: 0,
        data: list,
      };
    } catch (error) {
      console.error("获取权限列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async getPermissionsByRoleId(ctx) {
    const roleId = ctx.params.id;

    try {
      const permissionIds = await permissionService.getPermissionIdsByRoleId(roleId);
      const permissionCodes = await permissionService.getPermissionCodesByRoleId(roleId);

      ctx.body = {
        code: 0,
        data: {
          permissionIds,
          permissionCodes,
        },
      };
    } catch (error) {
      console.error("获取角色权限失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async updateRolePermissions(ctx) {
    const roleId = ctx.params.id;
    const { permissionIds = [] } = ctx.request.body;

    try {
      const ids = Array.isArray(permissionIds)
        ? permissionIds.map((id) => Number(id)).filter(Boolean)
        : [];

      const result = await permissionService.replaceRolePermissions(roleId, ids);
      const permissionCodes = await permissionService.getPermissionCodesByRoleId(roleId);

      ctx.body = {
        code: 0,
        message: "角色权限更新成功",
        data: {
          permissionIds: result,
          permissionCodes,
        },
      };
    } catch (error) {
      console.error("更新角色权限失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }
}

module.exports = new PermissionController();
