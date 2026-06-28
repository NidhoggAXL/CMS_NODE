const { ZHIPU_API_KEY } = require("../config/env");

const ZHIPU_API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const DEFAULT_MODEL = "glm-4-flash";

class AIService {
  getApiKey() {
    return ZHIPU_API_KEY;
  }

  async createStreamResponse({
    messages,
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens = 1800,
  }) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error("未配置 ZHIPU_API_KEY，请在服务端 .env 文件中设置");
    }

    const response = await fetch(ZHIPU_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        stream: true,
      }),
    });

    return response;
  }
}

module.exports = new AIService();
