import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Heatmap() {
  const [data, setData] = useState([]);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = user?.email || "guest";

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`progress_${userKey}`)) || {};

    const days = [];

    for (let i = 27; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = date.toISOString().split("T")[0];

      const entry = saved[key];

      // ✅ NEW STRUCTURE SUPPORT
      let total = 0;

      if (typeof entry === "object") {
        total =
          (entry.focus || 0) +
          (entry.short || 0) +
          (entry.long || 0);
      } else {
        total = entry || 0; // fallback (old data)
      }

      days.push({
        date: key,
        value: total,
      });
    }

    setData(days);
  }, []);

  const getColor = (val) => {
    if (val === 0) return "#0f172a";
    if (val < 30) return "#4c1d95";
    if (val < 60) return "#7c3aed";
    return "#a855f7";
  };

  return (
    <Box mt={4}>
      <Typography
        variant="h6"
        sx={{ color: "#a855f7", mb: 2 }}
      >
        📅 Activity Heatmap
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 18px)",
          gap: 6,
        }}
      >
        {data.map((d, i) => (
          <Box
            key={i}
            title={`${d.date} - ${d.value} min`}
            sx={{
              width: 18,
              height: 18,
              borderRadius: "4px",
              backgroundColor: getColor(d.value),
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.4)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}