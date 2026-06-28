const categoryService = require("../service/category.service");

class CategoryController {
  async getCategoriesList(ctx) {
    try {
      const list = await categoryService.getAllCategories();
      ctx.body = {
        code: 0,
        data: {
          list,
          totalCount: list.length,
        },
      };
    } catch (error) {
      console.error("获取分类列表失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async createCategory(ctx) {
    try {
      const category = ctx.request.body;
      const existing = await categoryService.getCategoryByName(category.name, category.parent_id ?? 0);
      if (existing.length > 0) {
        ctx.status = 409;
        ctx.body = { code: -1, message: "同级分类名称已存在" };
        return;
      }
      const result = await categoryService.createCategory(category);
      ctx.body = { code: 0, message: "分类创建成功", data: result };
    } catch (error) {
      console.error("创建分类失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async updateCategory(ctx) {
    try {
      const { id } = ctx.params;
      const category = ctx.request.body;
      const existing = await categoryService.getCategoryById(id);
      if (!existing) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "分类不存在" };
        return;
      }
      const result = await categoryService.updateCategory(id, category);
      ctx.body = { code: 0, message: "分类更新成功", data: result };
    } catch (error) {
      console.error("更新分类失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async deleteCategory(ctx) {
    try {
      const { id } = ctx.params;
      const existing = await categoryService.getCategoryById(id);
      if (!existing) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "分类不存在" };
        return;
      }
      await categoryService.deleteCategory(id);
      ctx.body = { code: 0, message: "分类删除成功" };
    } catch (error) {
      console.error("删除分类失败:", error);
      ctx.status = 400;
      ctx.body = { code: -1, message: error.message || "删除分类失败" };
    }
  }
}

module.exports = new CategoryController();
