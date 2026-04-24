import { Paper, Typography, Box, LinearProgress } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

const daysOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

// ✅ 🔥 IMPORTANT FIX
const getTotal = (dayData) => {
  if (!dayData) return 0;

  if (typeof dayData === "object") {
    return (dayData.focus || 0) + (dayData.short || 0) + (dayData.long || 0);
  }

  return dayData; // fallback old data
};

export default function ProgressCard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = user?.email || "guest";

  const [data, setData] = useState([]);
  const [todayTime, setTodayTime] = useState(0);
  const [goal, setGoal] = useState(120);

  const loadData = () => {
    const saved = getStorage(`progress_${userKey}`, {});
    const settings = getStorage(`settings_${userKey}`, {});

    const weekData = {
      Sun: 0, Mon: 0, Tue: 0, Wed: 0,
      Thu: 0, Fri: 0, Sat: 0,
    };

    // ✅ FIX HERE
    Object.entries(saved).forEach(([date, value]) => {
      const day = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      weekData[day] += getTotal(value); // 🔥 FIX
    });

    setData(
      daysOrder.map((day) => ({
        day,
        time: weekData[day] || 0,
      }))
    );

    const today = new Date().toLocaleDateString("en-US", {
      weekday: "short",
    });

    setTodayTime(weekData[today] || 0);
    setGoal(settings.goal || 120);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const update = () => loadData();
    window.addEventListener("progressUpdate", update);
    return () => window.removeEventListener("progressUpdate", update);
  }, []);

  const total = data.reduce((sum, d) => sum + d.time, 0);
  const streak = data.filter((d) => d.time > 0).length;
  const percent = Math.min((todayTime / goal) * 100, 100);

  return (
    <Paper
      sx={{
        p: 4,
        width: "100%",
        height: "100%",
        minHeight: 340,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "22px",
        background:
          "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.9))",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 40px rgba(168,85,247,0.25)",
        color: "white",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          📊 Progress
        </Typography>

        {/* GOAL */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, color: "#cbd5f5" }}>
            🎯 Today:{" "}
            <span style={{ color: "#a855f7", fontWeight: 600 }}>
              {todayTime}
            </span>{" "}
            / {goal} min
          </Typography>

          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              height: 10,
              borderRadius: 6,
              background: "#1e293b",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #9333ea, #a855f7)",
              },
            }}
          />
        </Box>

        {/* STATS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ color: "#94a3b8" }}>
            Total: {total} min
          </Typography>

          <Typography variant="body2" sx={{ color: "#c084fc" }}>
            🔥 {streak} day streak
          </Typography>
        </Box>
      </Box>

      {/* 📉 CHART */}
      <Box sx={{ height: 170, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickLine={false} />

            <Tooltip
              contentStyle={{
                background: "#020617",
                borderRadius: "10px",
              }}
            />

            <Line
              type="monotone"
              dataKey="time"
              stroke="#a855f7"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}