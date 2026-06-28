const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const aiController = require("../controller/ai.controller");

const aiRouter = new KoaRouter({ prefix: "/ai" });

aiRouter.post("/chat/stream", verifyAuth, aiController.streamChat);

module.exports = aiRouter;
