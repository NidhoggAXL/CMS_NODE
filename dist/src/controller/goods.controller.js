const goodsService = require("../service/goods.service");

class GoodsController {
  async getGoodsList(ctx) {
    try {
      const offset = parseInt(ctx.query.offset, 10) || 0;
      const size = parseInt(ctx.query.size, 10) || 12;
      const name = ctx.query.name || "";
      const category_id = ctx.query.category_id || "";
      const minPrice = ctx.query.minPrice ?? "";
      const maxPrice = ctx.query.maxPrice ?? "";

      const query = { offset, limit: size, name, category_id, minPrice, maxPrice };
      const list = await goodsService.getGoodsList(query);
      const totalCount = await goodsService.getGoodsCount(query);

      ctx.body = {
        code: 0,
        data: { list, totalCount, offset, size },
      };
    } catch (error) {
      console.error("获取商品列表失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async getAllGoods(ctx) {
    try {
      const list = await goodsService.getGoodsList({ offset: 0, limit: 1000 });
      ctx.body = {
        code: 0,
        data: { list, totalCount: list.length },
      };
    } catch (error) {
      console.error("获取全部商品失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async createGoods(ctx) {
    try {
      const goods = ctx.request.body;
      if (!goods.name || !goods.category_id || goods.price === undefined) {
        ctx.status = 400;
        ctx.body = { code: -1, message: "商品名称、分类和价格为必填项" };
        return;
      }
      const result = await goodsService.createGoods(goods);
      ctx.body = { code: 0, message: "商品创建成功", data: result };
    } catch (error) {
      console.error("创建商品失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async updateGoods(ctx) {
    try {
      const { id } = ctx.params;
      const goods = ctx.request.body;
      const existing = await goodsService.getGoodsById(id);
      if (!existing) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "商品不存在" };
        return;
      }
      const result = await goodsService.updateGoods(id, goods);
      ctx.body = { code: 0, message: "商品更新成功", data: result };
    } catch (error) {
      console.error("更新商品失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }

  async deleteGoods(ctx) {
    try {
      const { id } = ctx.params;
      const existing = await goodsService.getGoodsById(id);
      if (!existing) {
        ctx.status = 404;
        ctx.body = { code: -1, message: "商品不存在" };
        return;
      }
      await goodsService.deleteGoods(id);
      ctx.body = { code: 0, message: "商品删除成功" };
    } catch (error) {
      console.error("删除商品失败:", error);
      ctx.status = 500;
      ctx.body = { code: -1, message: "服务器内部错误", error: error.message };
    }
  }
}

module.exports = new GoodsController();
