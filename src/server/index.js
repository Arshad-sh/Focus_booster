import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  console.log("🔥 API HIT:", req.body);

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a strict productivity coach. Give short, different advice every time.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("🤖 AI RAW:", data);

    const reply = data?.choices?.[0]?.message?.content;

    res.json({
      reply: reply || "⚠️ AI did not respond",
    });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});