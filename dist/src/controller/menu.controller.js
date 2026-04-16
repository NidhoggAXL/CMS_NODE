const menuService = require("../service/menu.service");

// 构建菜单树形结构
function buildMenuTree(menus) {
  // 创建一个映射，将菜单项按ID分组
  const menuMap = {};
  menus.forEach((menu) => {
    menuMap[menu.id] = { ...menu, children: [] };
  });

  // 创建根菜单数组
  const rootMenus = [];

  // 遍历所有菜单项，建立父子关系
  menus.forEach((menu) => {
    const currentMenu = menuMap[menu.id];

    if (menu.parent_id === null || menu.parent_id === 0) {
      // 如果没有父级，则为根菜单
      rootMenus.push(currentMenu);
    } else {
      // 如果有父级，则添加到父级的children数组中
      const parentMenu = menuMap[menu.parent_id];
      if (parentMenu) {
        parentMenu.children.push(currentMenu);
      }
    }
  });

  return rootMenus;
}

class MenuController {
  // 获取菜单树形列表
  async getMenusList(ctx, next) {
    try {
      // 获取所有菜单
      const allMenus = await menuService.getAllMenus();

      // 构建树形结构
      const menuTree = buildMenuTree(allMenus);

      ctx.body = {
        code: 0,
        data: menuTree,
      };
    } catch (error) {
      console.error("获取菜单列表失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 根据角色ID获取菜单权限
  async getMenusByRoleId(ctx, next) {
    const roleId = ctx.params.id;

    try {
      // 获取角色拥有的菜单权限
      const roleMenus = await menuService.getMenusByRoleId(roleId);

      // 构建树形结构
      const menuTree = buildMenuTree(roleMenus);

      ctx.body = {
        code: 0,
        data: menuTree,
      };
    } catch (error) {
      console.error("获取角色菜单时出错:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 创建菜单
  async createMenu(ctx, next) {
    try {
      // 获取请求体数据
      const menuData = ctx.request.body;

      // 验证必要字段
      if (!menuData.name || !menuData.type) {
        ctx.status = 400;
        ctx.body = {
          code: -1,
          message: "菜单名称和类型为必填项",
        };
        return;
      }

      // 调用服务创建菜单
      const result = await menuService.createMenu(menuData);

      ctx.body = {
        code: 0,
        message: "菜单创建成功",
        data: result,
      };
    } catch (error) {
      console.error("创建菜单失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 删除菜单
  async deleteMenu(ctx, next) {
    try {
      // 获取菜单ID
      const menuId = ctx.params.id;

      // 验证ID
      if (!menuId) {
        ctx.status = 400;
        ctx.body = {
          code: -1,
          message: "菜单ID不能为空",
        };
        return;
      }

      // 调用服务删除菜单（包括子菜单）
      const result = await menuService.deleteMenu(menuId);

      ctx.body = {
        code: 0,
        message: "菜单删除成功",
        data: result,
      };
    } catch (error) {
      console.error("删除菜单失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }

  // 更新菜单
  async updateMenu(ctx, next) {
    try {
      // 获取菜单ID
      const menuId = ctx.params.id;
      // 获取请求体数据
      const menuInfo = ctx.request.body;
      // ctx.log.info("更新菜单信息:", { menuId, menuInfo });
      // console.log(menuId, menuInfo)

      // 验证ID
      if (!menuId) {
        ctx.status = 400;
        ctx.body = {
          code: -1,
          message: "菜单ID不能为空",
        };
        return;
      }

      // 验证必要字段
      if (!menuInfo.name || !menuInfo.type) {
        ctx.status = 400;
        ctx.body = {
          code: -1,
          message: "菜单名称和类型为必填项",
        };
        return;
      }

      // 调用服务更新菜单
      const result = await menuService.updateMenu(menuId, menuInfo);

      ctx.body = {
        code: 0,
        message: "菜单更新成功",
        data: result,
      };
    } catch (error) {
      console.error("更新菜单失败:", error);
      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: "服务器内部错误",
        error: error.message,
      };
    }
  }
}

module.exports = new MenuController();
