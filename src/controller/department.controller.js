const departmentService = require("../service/department.service");

class DepartmentController {
  // 获取部门列表
  async getDepartmentsList(ctx, next) {
    try {
      // 获取分页参数
      let offset = parseInt(ctx.query.offset) || 0;
      const size = parseInt(ctx.query.size) || 10;
      // 获取部门列表和总数
      const list = await departmentService.getDepartmentsList(offset, size);
      const totalCount = await departmentService.getDepartmentsCount();

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
      console.error("获取部门列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 创建部门
  async createDepartment(ctx, next) {
    try {
      const department = ctx.request.body;
      const { name } = department;

      // 检查部门名称是否已存在
      const existingDepartment =
        await departmentService.getDepartmentByName(name);
      if (existingDepartment.length > 0) {
        ctx.status = 409; // Conflict
        ctx.body = {
          code: -1,
          message: "部门名称已存在",
        };
        return;
      }

      // 创建部门
      const result = await departmentService.createDepartment(department);

      ctx.body = {
        code: 0,
        message: "部门创建成功",
        data: result,
      };
    } catch (error) {
      console.error("创建部门失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 删除部门
  async deleteDepartment(ctx, next) {
    try {
      const { id } = ctx.params;
      // 检查部门是否存在
      const result = await departmentService.getDepartmentById(id);
      if (result.length === 0) {
        ctx.status = 404;
        ctx.body = {
          code: -1,
          message: "部门不存在",
        };
        return;
      }

      // 删除部门
      await departmentService.deleteDepartment(id);

      ctx.body = {
        code: 0,
        message: "部门删除成功",
      };
    } catch (error) {
      console.error("删除部门失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 更新部门
  async updateDepartment(ctx, next) {
    try {
      const { id } = ctx.params;
      const departmentData = ctx.request.body;
      const { name } = departmentData;

      // 检查部门是否存在
      const existingDepartment = await departmentService.getDepartmentById(id);
      if (existingDepartment.length === 0) {
        ctx.status = 404;
        ctx.body = {
          code: -1,
          message: "部门不存在",
        };
        return;
      }

      // 检查部门名称是否已被其他部门使用
      const departmentWithName =
        await departmentService.getDepartmentByName(name);
      if (departmentWithName.length > 0 && departmentWithName[0].id !== id) {
        ctx.status = 409;
        ctx.body = {
          code: -1,
          message: "部门名称已存在",
        };
        return;
      }

      // 更新部门
      await departmentService.updateDepartment(id, departmentData);

      ctx.body = {
        code: 0,
        message: "部门更新成功",
      };
    } catch (error) {
      console.error("更新部门失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }
}

module.exports = new DepartmentController();
