const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const goodsController = require("../controller/goods.controller");

const goodsRouter = new KoaRouter({ prefix: "/goods" });

goodsRouter.get("/list", verifyAuth, goodsController.getGoodsList);
goodsRouter.get("/all", verifyAuth, goodsController.getAllGoods);
goodsRouter.post("/", verifyAuth, goodsController.createGoods);
goodsRouter.patch("/:id", verifyAuth, goodsController.updateGoods);
goodsRouter.delete("/:id", verifyAuth, goodsController.deleteGoods);

module.exports = goodsRouter;
