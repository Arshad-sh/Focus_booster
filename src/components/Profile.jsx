import { Paper, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Profile({ user }) {
  const [progress, setProgress] = useState({
    totalTime: 0,
    sessions: 0,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("progress"));

    if (saved?.days) {
      const totalTime = Object.values(saved.days).reduce(
        (sum, val) => sum + val,
        0
      );

      const sessions = Object.values(saved.days).filter(
        (v) => v > 0
      ).length;

      setProgress({ totalTime, sessions });
    }
  }, []);

  return (
    <Paper
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 5,
        p: 4,
        borderRadius: "20px",
        textAlign: "center",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 30px rgba(168,85,247,0.3)",
        color: "white",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        👤 Profile
      </Typography>

      <Typography sx={{ mb: 2 }}>
        📧 {user.email}
      </Typography>

      <Box>
        <Typography>
          ⏱ Total Time: <b>{progress.totalTime} min</b>
        </Typography>

        <Typography sx={{ mt: 1 }}>
          ✅ Sessions: <b>{progress.sessions}</b>
        </Typography>

        <Typography sx={{ mt: 1 }}>
          🔥 Streak: <b>{progress.sessions} days</b>
        </Typography>
      </Box>
    </Paper>
  );
}