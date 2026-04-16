const roleService = require("../service/role.service");

class RoleController {
  // 根据ID查询角色信息
  async getRoleById(ctx, next) {
    const roleId = ctx.params.id;

    try {
      const result = await roleService.getRoleById(roleId);

      if (result.length > 0) {
        ctx.body = {
          message: "查询角色成功",
          data: result[0],
        };
      } else {
        ctx.body = {
          message: "未找到对应的角色",
          data: null,
        };
      }
    } catch (error) {
      console.error("查询角色时出错:", error);
      ctx.status = 500;
      ctx.body = {
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 获取角色列表
  async getRolesList(ctx, next) {
    try {
      const size = parseInt(ctx.query.size) || 10; // 获取分页参数
      let offset = parseInt(ctx.query.offset) || 0;
      // 获取角色列表和总数
      const list = await roleService.getRolesList(offset, size);
      const totalCount = await roleService.getRolesCount();

      ctx.body = {
        code: 0,
        data: {
          list: list,
          totalCount: totalCount,
          offset: offset,
          size: size,
        },
      };
    } catch (error) {
      console.error("获取角色列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 创建角色
  async createRole(ctx, next) {
    try {
      const { name, intro } = ctx.request.body;

      // 验证必要字段
      if (!name) {
        ctx.status = 400;
        ctx.body = {
          code: -1,
          message: "角色名称不能为空",
        };
        return;
      }

      // 检查角色名称是否已存在
      const existingRole = await roleService.getRoleByName(name);
      if (existingRole && existingRole.length > 0) {
        ctx.status = 409; // Conflict
        ctx.body = {
          code: -1,
          message: "角色名称已存在",
        };
        return;
      }

      // 创建角色
      const result = await roleService.createRole({ name, intro });

      ctx.body = {
        code: 0,
        message: "角色创建成功",
        data: {
          id: result.insertId,
          name,
          intro,
        },
      };
    } catch (error) {
      console.error("创建角色失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 更新角色
  async updateRole(ctx, next) {
    try {
      const roleId = ctx.params.id;
      const { name, intro } = ctx.request.body;

      // 检查角色是否存在
      const existingRole = await roleService.getRoleInfoById(roleId);
      if (!existingRole || existingRole.length === 0) {
        ctx.status = 404;
        ctx.body = {
          code: -1,
          message: "角色不存在",
        };
        return;
      }

      // 如果提供了角色名称，检查是否与其他角色重复
      if (name) {
        const duplicateRole = await roleService.getRoleByName(name);
        // 检查是否是同一个角色ID
        if (
          duplicateRole &&
          duplicateRole.length > 0 &&
          duplicateRole[0].id != roleId
        ) {
          ctx.status = 409; // Conflict
          ctx.body = {
            code: -1,
            message: "角色名称已存在",
          };
          return;
        }
      }

      // 准备更新数据
      const roleData = {};
      if (name !== undefined) {
        roleData.name = name;
      }
      if (intro !== undefined) {
        roleData.intro = intro;
      }

      // 更新角色
      const result = await roleService.updateRole(roleId, roleData);

      // 获取更新后的角色信息
      const updatedRole = await roleService.getRoleInfoById(roleId);

      ctx.body = {
        code: 0,
        message: "角色更新成功",
        data: updatedRole[0],
      };
    } catch (error) {
      console.error("更新角色失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 删除角色
  async deleteRole(ctx, next) {
    try {
      const roleId = ctx.params.id;

      // 检查角色是否存在
      const existingRole = await roleService.getRoleInfoById(roleId);
      if (!existingRole || existingRole.length === 0) {
        ctx.status = 404;
        ctx.body = {
          code: -1,
          message: "角色不存在",
        };
        return;
      }

      // 删除角色
      const result = await roleService.deleteRole(roleId);

      ctx.body = {
        code: 0,
        message: "角色删除成功",
        data: {
          affectedRows: result.affectedRows,
          roleId: roleId,
        },
      };
    } catch (error) {
      console.error("删除角色失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }
}

module.exports = new RoleController();
