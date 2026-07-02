const https = require("https");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY 미설정" });

  const { messages, system } = req.body;

  const geminiMessages = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const body = JSON.stringify({
    system_instruction: { parts: [{ text: system }] },
    contents: geminiMessages,
  });

  return new Promise((resolve) => {
    const request = https.request({
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (response) => {
      let data = "";
      response.on("data", chunk => { data += chunk; });
      response.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
            || parsed.error?.message
            || "응답을 받지 못했습니다.";
          res.json({ content: [{ type: "text", text }] });
        } catch(e) {
          res.status(500).json({ error: "응답 파싱 오류" });
        }
        resolve();
      });
    });
    request.on("error", err => {
      res.status(500).json({ error: err.message });
      resolve();
    });
    request.write(body);
    request.end();
  });
};
