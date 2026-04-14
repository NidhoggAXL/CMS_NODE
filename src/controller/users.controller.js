const usersService = require("../service/users.service");

class UserController {
  async create(ctx, next) {
    // 获取用户的信息
    const user = ctx.request.body;

    // 设置默认值
    const userData = {
      name: user.name,
      realname: user.realname || null,
      password: user.password,
      cellphone: user.cellphone || null,
      email: user.email || null,
      avatar: user.avatar || null,
      enable: user.enable !== undefined ? user.enable : 1, // 默认启用
      department_id: user.department_id || null,
      role_id: user.role_id || null,
    };

    // 如果提供了手机号，检查手机号是否已存在
    if (userData.cellphone) {
      const existingPhone = await usersService.getUserByCellphone(
        userData.cellphone,
      );
      if (existingPhone && existingPhone.length > 0) {
        ctx.status = 409; // Conflict
        ctx.body = {
          code: -1,
          message: "手机号已被占用",
        };
        return;
      }
    }

    // 存储到数据库
    const result = await usersService.create(userData);

    // 查看存储结果，告诉前端存储成功
    ctx.body = {
      message: "用户创建成功",
      data: result,
    };
  }

  async getUsersList(ctx, next) {
    try {
      // 获取分页参数 - 支持两种参数格式
      let offset = parseInt(ctx.query.offset) || 0;
      const size = parseInt(ctx.query.size) || 10;

      // 获取用户列表和总数
      const list = await usersService.getUsersList(offset, size);
      const totalCount = await usersService.getUsersCount();

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
      console.error("获取用户列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async deleteUser(ctx, next) {
    try {
      const userId = ctx.params.id;

      // 检查用户是否存在
      const result = await usersService.getUserById(userId);
      if (!result || result.length === 0) {
        ctx.status = 404;
        ctx.body = {
          code: -1,
          message: "用户不存在",
        };
        return;
      }

      // 删除用户
      const deleteResult = await usersService.deleteUser(userId);

      ctx.body = {
        code: 0,
        message: "用户删除成功",
        data: {
          affectedRows: deleteResult.affectedRows,
          userId: userId,
        },
      };
    } catch (error) {
      console.error("删除用户失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  async updateUser(ctx, next) {
    try {
      const userId = ctx.params.id;
      const updateData = ctx.request.body;
      // console.log(updateData);
      // 检查用户是否存在
      const existingUser = await usersService.getUserById(userId);
      if (!existingUser || existingUser.length === 0) {
        ctx.status = 404;
        ctx.body = {
          code: -1,
          message: "用户不存在",
        };
        return;
      }

      // 准备更新数据，映射字段名
      const userData = {};

      if (updateData.name !== undefined) {
        userData.name = updateData.name;
      }
      if (updateData.realname !== undefined) {
        userData.realname = updateData.realname;
      }
      // 只有当密码字段存在且不为空字符串时才更新密码
      if (updateData.password !== undefined && updateData.password !== "") {
        // 如果提供了密码，对其进行加密
        const md5Password = require("../utils/md5-password");
        userData.password = md5Password(updateData.password);
      }
      if (updateData.cellphone !== undefined) {
        userData.cellphone = updateData.cellphone;
      }
      if (updateData.email !== undefined) {
        userData.email = updateData.email;
      }
      if (updateData.avatar !== undefined) {
        userData.avatar = updateData.avatar;
      }
      if (updateData.enable !== undefined) {
        userData.enable = updateData.enable;
      }
      if (updateData.department_id !== undefined) {
        userData.department_id = updateData.department_id;
      }
      if (updateData.role_id !== undefined) {
        userData.role_id = updateData.role_id;
      }

      // 更新用户
      const updateResult = await usersService.updateUser(userId, userData);

      // 获取更新后的用户信息
      const updatedUser = await usersService.getUserById(userId);

      // 确保字段映射正确
      const userWithCorrectFields = {
        id: updatedUser[0].id,
        name: updatedUser[0].name,
        realname: updatedUser[0].realname,
        cellphone: updatedUser[0].cellphone,
        enable: updatedUser[0].enable,
        department_id: updatedUser[0].department_id,
        role_id: updatedUser[0].role_id,
        createAt: updatedUser[0].createAt,
        updateAt: updatedUser[0].updateAt,
      };

      ctx.body = {
        code: 0,
        message: "用户更新成功",
        data: userWithCorrectFields,
      };
    } catch (error) {
      console.error("更新用户失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 添加用户
  async addUser(ctx, next) {
    try {
      // 获取用户的信息
      const user = ctx.request.body;

      // 验证必要字段
      if (!user.name || !user.password) {
        ctx.status = 400;
        ctx.body = {
          code: -1,
          message: "用户名和密码不能为空",
        };
        return;
      }

      // 设置默认值
      const userData = {
        name: user.name,
        realname: user.realname || null,
        password: user.password,
        cellphone: user.cellphone || null,
        email: user.email || null,
        avatar: user.avatar || null,
        enable: user.enable !== undefined ? user.enable : 1, // 默认启用
        department_id: user.department_id || null,
        role_id: user.role_id || null,
      };

      // 检查用户名是否已存在
      const existingUser = await usersService.getUserByName(user.name);
      if (existingUser && existingUser.length > 0) {
        ctx.status = 409; // Conflict
        ctx.body = {
          code: -1,
          message: "用户名已存在",
        };
        return;
      }

      // 如果提供了手机号，检查手机号是否已存在
      if (userData.cellphone) {
        const existingPhone = await usersService.getUserByCellphone(
          userData.cellphone,
        );
        if (existingPhone && existingPhone.length > 0) {
          ctx.status = 409; // Conflict
          ctx.body = {
            code: -1,
            message: "手机号已被占用",
          };
          return;
        }
      }

      // 存储到数据库
      const result = await usersService.create(userData);

      // 查看存储结果，告诉前端存储成功
      ctx.body = {
        code: 0,
        message: "用户添加成功",
        data: {
          id: result.insertId,
          name: userData.name,
          realname: userData.realname,
          cellphone: userData.cellphone,
          email: userData.email,
          enable: userData.enable,
          department_id: userData.department_id,
          role_id: userData.role_id,
        },
      };
    } catch (error) {
      console.error("添加用户失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 查询用户列表
  async queryUsersList(ctx, next) {
    try {
      // 获取查询参数
      const query = ctx.request.query;
      // 获取分页参数
      let offset = parseInt(query.offset) || 0;
      const size = parseInt(query.size) || 10;

      // 构建查询条件对象
      const queryConditions = {};

      if (query.name) {
        queryConditions.name = query.name;
      }
      if (query.realname) {
        queryConditions.realname = query.realname;
      }
      if (query.cellphone) {
        queryConditions.cellphone = query.cellphone;
      }
      if (query.enable !== undefined && query.enable !== "") {
        queryConditions.enable = parseInt(query.enable);
      }
      if (query.department_id) {
        queryConditions.department_id = parseInt(query.department_id);
      }
      if (query.role_id) {
        queryConditions.role_id = parseInt(query.role_id);
      }
      if (query.createAt) {
        // 处理日期范围，前端可能传递数组
        try {
          if (Array.isArray(query.createAt)) {
            queryConditions.createAt = query.createAt;
          } else if (typeof query.createAt === "string") {
            // 如果是字符串，尝试解析为数组
            const parsed = JSON.parse(query.createAt);
            if (Array.isArray(parsed)) {
              queryConditions.createAt = parsed;
            }
          }
        } catch (e) {
          // 如果解析失败，忽略日期条件
          console.warn("日期解析失败:", e);
        }
      }

      // 查询用户列表
      const list = await usersService.queryUsersList(
        queryConditions,
        offset,
        size,
      );
      const totalCount = await usersService.queryUsersCount(queryConditions);

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
      console.error("查询用户列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }
}
module.exports = new UserController();
