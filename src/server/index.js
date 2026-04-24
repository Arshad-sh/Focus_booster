import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ai", (req, res) => {
  console.log("🔥 API HIT:", req.body);

  const { message } = req.body;

  if (!message) {
    return res.json({ reply: "⚠️ Message is required" });
  }

  const text = message.toLowerCase();

  let reply = "";

  // 🎯 Smart fake AI logic
  if (text.includes("distract")) {
    reply = "📵 Put your phone in another room. Focus = sacrifice.";
  } 
  else if (text.includes("lazy")) {
    reply = "⚡ Action creates motivation. Start NOW, not later.";
  } 
  else if (text.includes("study")) {
    reply = "📚 Study 25 min. Break 5 min. Repeat. Discipline wins.";
  } 
  else if (text.includes("tired")) {
    reply = "😴 Rest 10 min, not 2 hours. Then get back to work.";
  } 
  else {
    const randomReplies = [
      "🔥 Discipline > Motivation. Show up anyway.",
      "🚀 Start before you're ready.",
      "⏳ Small steps daily = Big success.",
      "🧠 Focus is a skill. Train it.",
      "⚔️ Do hard things. That's growth."
    ];

    reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
  }

  res.json({ reply });
});

// ✅ Render compatible port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});