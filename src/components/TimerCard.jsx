import {
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function TimerCard() {
  const modes = { focus: 25, short: 5, long: 15 };

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = user?.email || "guest";

  const [mode, setMode] = useState("focus");

  const [minutes, setMinutes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(`settings_${userKey}`));
    return saved?.defaultTime || 25;
  });

  const [time, setTime] = useState(minutes * 60);
  const [running, setRunning] = useState(false);

  const [sessions, setSessions] = useState(
    Number(localStorage.getItem(`sessions_${userKey}`)) || 0
  );

  const [goalOpen, setGoalOpen] = useState(false);
  const audioRef = useRef(null);

  const totalTime = minutes * 60;
  const progress = totalTime ? (time / totalTime) * 100 : 0;

  // ⏱️ TIMER
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // ✅ HANDLE FINISH
  useEffect(() => {
    if (time !== 0 || !running) return;

    setRunning(false);

    const settings =
      JSON.parse(localStorage.getItem(`settings_${userKey}`)) || {};

    // 🔔 Sound
    if (settings.alarm !== false && audioRef.current) {
      audioRef.current.src = `/${settings.sound || "alarm.mp3"}`;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // 🔥 ✅ MODE-WISE STORAGE FIX
    const prev =
      JSON.parse(localStorage.getItem(`progress_${userKey}`)) || {};

    const today = new Date().toISOString().split("T")[0];

    const todayData = prev[today] || {
      focus: 0,
      short: 0,
      long: 0,
    };

    // ✅ add time based on mode
    todayData[mode] += minutes;

    const updated = {
      ...prev,
      [today]: todayData,
    };

    localStorage.setItem(
      `progress_${userKey}`,
      JSON.stringify(updated)
    );

    // ✅ sessions only for focus
    if (mode === "focus") {
      setSessions((prevSessions) => {
        const newSessions = prevSessions + 1;
        localStorage.setItem(`sessions_${userKey}`, newSessions);
        return newSessions;
      });
    }

    // 🎯 goal check (total of all modes)
    const totalToday =
      todayData.focus + todayData.short + todayData.long;

    const goal = settings.goal || 120;
    if (totalToday >= goal) setGoalOpen(true);

    // 🔁 update progress card
    window.dispatchEvent(new Event("progressUpdate"));

    // 🔁 Auto switch
    if (mode === "focus") {
      setMode("short");
      setMinutes(modes.short);
      setTime(modes.short * 60);
    } else {
      setMode("focus");
      setMinutes(modes.focus);
      setTime(modes.focus * 60);
    }
  }, [time]);

  const handleStart = () => {
    if (minutes <= 0) return;
    setTime(minutes * 60);
    setRunning(true);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(minutes * 60);
  };

  const handleModeChange = (m) => {
    setMode(m);
    setMinutes(modes[m]);
    setTime(modes[m] * 60);
    setRunning(false);
  };

  return (
    <>
      <Paper
        sx={{
          p: { xs: 2.5, sm: 4 },
          width: "100%",
          maxWidth: 420,
          mx: "auto",
          borderRadius: "25px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.9))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 50px rgba(168,85,247,0.35)",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          ⏱️ Focus Timer
        </Typography>

        <audio ref={audioRef} preload="auto" />

        {/* MODES */}
        <Box sx={{ display: "flex", gap: 1, mb: 3, justifyContent: "center" }}>
          {Object.keys(modes).map((m) => {
            const active = mode === m;

            return (
              <Button
                key={m}
                size="small"
                onClick={() => handleModeChange(m)}
                sx={{
                  borderRadius: "10px",
                  px: 2,
                  background: active
                    ? "linear-gradient(135deg, #9333ea, #a855f7)"
                    : "rgba(255,255,255,0.05)",
                  color: active ? "#fff" : "#94a3b8",
                }}
              >
                {m.toUpperCase()}
              </Button>
            );
          })}
        </Box>

        {/* TIMER */}
        <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={130}
            thickness={5}
            sx={{ color: "#a855f7" }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {Math.floor(time / 60)}:
              {(time % 60).toString().padStart(2, "0")}
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ mb: 2, color: "#c084fc" }}>
          🔥 Sessions: {sessions}
        </Typography>

        <TextField
          type="number"
          label="Minutes"
          value={minutes}
          disabled={running}
          onChange={(e) => setMinutes(Number(e.target.value))}
          size="small"
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1.5,
          }}
        >
          <Button variant="contained" onClick={handleStart}>
            Start
          </Button>

          <Button variant="outlined" onClick={() => setRunning(!running)}>
            {running ? "Pause" : "Resume"}
          </Button>

          <Button color="error" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={goalOpen}
        autoHideDuration={3000}
        onClose={() => setGoalOpen(false)}
        message="🎉 Daily Goal Completed!"
      />
    </>
  );
}