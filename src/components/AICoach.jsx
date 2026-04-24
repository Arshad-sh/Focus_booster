import { useState } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";

export default function AICoach() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    if (!input.trim()) {
      setResponse("⚠️ Please enter something first");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
          const res = await fetch("https://focus-booster-api.onrender.com/api/ai", {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           message: input }),
      });

      // 👇 Handle server error properly
      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      setResponse(data.reply || "⚠️ No response from AI");

    } catch (err) {
      console.error("Frontend Error:", err);
      setResponse("❌ Cannot connect to AI server");
    }

    setLoading(false);
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "20px",
        maxWidth: 420,
        mx: "auto",
        background:
          "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.9))",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        🤖 AI Focus Coach
      </Typography>

      <TextField
        fullWidth
        placeholder="Describe your distraction..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{
          mb: 2,
          input: { color: "white" },
        }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={getAdvice}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Get Advice"}
      </Button>

      {response && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: "10px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {response}
        </Box>
      )}
    </Paper>
  );
}