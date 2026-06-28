const aiService = require("../service/ai.service");

class AIController {
  async streamChat(ctx) {
    try {
      const { messages, model, temperature, maxTokens } = ctx.request.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        ctx.status = 400;
        ctx.body = { code: -1, message: "messages 不能为空" };
        return;
      }

      const upstream = await aiService.createStreamResponse({
        messages,
        model,
        temperature,
        maxTokens,
      });

      if (!upstream.ok) {
        const errorText = await upstream.text();
        let message = "AI 请求失败";
        try {
          const errorJson = JSON.parse(errorText);
          message = errorJson?.error?.message || message;
        } catch {
          message = errorText || message;
        }

        ctx.status = upstream.status;
        ctx.body = { code: -1, message };
        return;
      }

      if (!upstream.body) {
        ctx.status = 502;
        ctx.body = { code: -1, message: "AI 服务未返回流式数据" };
        return;
      }

      ctx.set({
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      });
      ctx.status = 200;
      ctx.respond = false;

      const reader = upstream.body.getReader();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          ctx.res.write(Buffer.from(value));
        }
      } catch (streamError) {
        console.error("AI 流式转发失败:", streamError);
      } finally {
        ctx.res.end();
      }
    } catch (error) {
      console.error("AI 流式接口失败:", error);

      if (ctx.respond === false) {
        ctx.res.end();
        return;
      }

      ctx.status = 500;
      ctx.body = {
        code: -1,
        message: error.message || "服务器内部错误",
      };
    }
  }
}

module.exports = new AIController();
