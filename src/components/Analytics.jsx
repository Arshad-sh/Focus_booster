import Heatmap from "./Heatmap";
import { Paper, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const daysOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userKey = user?.email || "guest";

    const saved =
      JSON.parse(localStorage.getItem(`progress_${userKey}`)) || {};

    const weekData = {
      Mon: { focus: 0, short: 0, long: 0 },
      Tue: { focus: 0, short: 0, long: 0 },
      Wed: { focus: 0, short: 0, long: 0 },
      Thu: { focus: 0, short: 0, long: 0 },
      Fri: { focus: 0, short: 0, long: 0 },
      Sat: { focus: 0, short: 0, long: 0 },
      Sun: { focus: 0, short: 0, long: 0 },
    };

    Object.entries(saved).forEach(([date, value]) => {
      const d = new Date(date);
      if (isNaN(d)) return;

      const day = d.toLocaleDateString("en-US", {
        weekday: "short",
      });

      if (!weekData[day]) return;

      // 🔥 NEW STRUCTURE SUPPORT
      weekData[day].focus += value.focus || 0;
      weekData[day].short += value.short || 0;
      weekData[day].long += value.long || 0;
    });

    const formatted = daysOrder.map((day) => ({
      day,
      focus: weekData[day].focus,
      short: weekData[day].short,
      long: weekData[day].long,
      total:
        weekData[day].focus +
        weekData[day].short +
        weekData[day].long,
    }));

    setData(formatted);
  }, []);

  // 📊 CALCULATIONS
  const total = data.reduce((sum, d) => sum + d.total, 0);
  const avg = data.length ? Math.round(total / 7) : 0;

  const bestDay =
    data.length > 0
      ? data.reduce((max, d) => (d.total > max.total ? d : max), data[0])
      : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* 📊 ANALYTICS CARD */}
      <Paper
        sx={{
          p: { xs: 2.5, md: 4 },
          width: "100%",
          maxWidth: 420,
          borderRadius: "25px",
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.9))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(168,85,247,0.3)",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, color: "#a855f7" }}>
          📊 Analytics Dashboard
        </Typography>

        {/* STATS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography>📈 Total: {total} min</Typography>
          <Typography>⚡ Avg: {avg} min/day</Typography>
          <Typography>
            🏆 Best: {bestDay ? bestDay.day : "—"}
          </Typography>
        </Box>

        {/* CHART */}
        <Box sx={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />

              {/* 🔥 MULTI BARS */}
              <Bar dataKey="focus" fill="#a855f7" />
              <Bar dataKey="short" fill="#3b82f6" />
              <Bar dataKey="long" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* 📅 HEATMAP */}
      <Paper
        sx={{
          p: { xs: 2.5, md: 3 },
          width: "100%",
          maxWidth: 420,
          borderRadius: "25px",
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.5), rgba(15,23,42,0.8))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 30px rgba(168,85,247,0.2)",
        }}
      >
        <Heatmap />
      </Paper>
    </Box>
  );
}