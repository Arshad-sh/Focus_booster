import { Paper, Typography, Button, Box } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useState, useEffect } from "react";

export default function QuoteCard() {
  const [quote, setQuote] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://zenquotes.io/api/random");

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      // ✅ ZenQuotes response
      setQuote(`${data[0].q} — ${data[0].a}`);

    } catch (err) {
      console.error(err);

      // 🔥 fallback (backup)
      const fallback = [
        "Stay focused and never give up.",
        "Discipline is the key to success.",
        "Push yourself, because no one else will.",
        "Consistency beats motivation.",
        "Success is built daily.",
        "Small steps lead to big results.",
        "Hard work beats talent when talent doesn't work hard.",
        "Dream big. Start small. Act now.",
      ];

      setQuote(
        fallback[Math.floor(Math.random() * fallback.length)]
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ load first quote
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Paper
      sx={{
        p: { xs: 3, sm: 4 },
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        minHeight: 320,
        borderRadius: "22px",

        background:
          "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.9))",
        backdropFilter: "blur(20px)",

        boxShadow: "0 0 40px rgba(59,130,246,0.25)",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        color: "white",
      }}
    >
      {/* TOP */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FormatQuoteIcon
            sx={{
              color: "#60a5fa",
              mr: 1,
              fontSize: 28,
            }}
          />

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "#60a5fa",
              letterSpacing: "0.5px",
            }}
          >
            Motivation
          </Typography>
        </Box>

        <Typography
          sx={{
            fontStyle: "italic",
            color: "#e2e8f0",
            lineHeight: 1.8,
          }}
        >
          “{loading ? "Loading..." : quote}”
        </Typography>
      </Box>

      {/* BUTTON */}
      <Button
        variant="contained"
        fullWidth
        onClick={fetchQuote}
        disabled={loading}
        sx={{
          py: 1.3,
          borderRadius: "14px",
          fontWeight: 700,
          textTransform: "none",

          background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
          boxShadow: "0 4px 15px rgba(59,130,246,0.4)",

          "&:hover": {
            boxShadow: "0 6px 25px rgba(59,130,246,0.6)",
          },
        }}
      >
        {loading ? "Loading..." : "New Quote"}
      </Button>
    </Paper>
  );
}