import {
  Paper,
  Typography,
  Switch,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState, useRef } from "react";

export default function Settings() {
  const [alarm, setAlarm] = useState(true);
  const [defaultTime, setDefaultTime] = useState(25);
  const [goal, setGoal] = useState(120);
  const [sound, setSound] = useState("alarm.mp3");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const audioRef = useRef(null);

  // 🔐 Load settings
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("settings"));
    if (savedData) {
      setAlarm(savedData.alarm ?? true);
      setDefaultTime(savedData.defaultTime ?? 25);
      setGoal(savedData.goal ?? 120);
      setSound(savedData.sound || "alarm.mp3");
    }
  }, []);

  // 🔊 Unlock audio (browser policy fix)
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          })
          .catch(() => {});
      }
      document.removeEventListener("click", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
    return () => document.removeEventListener("click", unlockAudio);
  }, []);

  // 💾 Save
  const handleSave = () => {
    setSaving(true);
    setSaved(false);

    setTimeout(() => {
      localStorage.setItem(
        "settings",
        JSON.stringify({ alarm, defaultTime, goal, sound })
      );

      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  // 🔊 Test sound
  const handleTestSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // ♻️ Reset
  const handleReset = () => {
    localStorage.removeItem("progress");
  };

  return (
    <Paper
      sx={{
        p: { xs: 2.5, sm: 4 },
        width: "100%",
        maxWidth: 420,
        mx: "auto",

        borderRadius: "28px",

        // 🔥 CLEAN PREMIUM GLASS
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.95))",

        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",

        border: "1px solid rgba(255,255,255,0.12)",

        boxShadow: "0 0 50px rgba(168,85,247,0.25)",

        color: "white",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <SettingsIcon sx={{ mr: 1, color: "#a855f7" }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Settings
        </Typography>
      </Box>

      {/* ALARM */}
      <Box sx={cardStyle}>
        <Typography>🔊 Alarm Sound</Typography>
        <Switch
          checked={alarm}
          onChange={(e) => setAlarm(e.target.checked)}
          sx={switchStyle}
        />
      </Box>

      {/* SOUND */}
      <TextField
        select
        label="Select Sound"
        value={sound}
        onChange={(e) => setSound(e.target.value)}
        fullWidth
        sx={{ ...inputStyle, mt: 2 }}
      >
        <MenuItem value="alarm.mp3">Default Alarm</MenuItem>
        <MenuItem value="Bell.mp3">Bell</MenuItem>
        <MenuItem value="Beep.mp3">Beep</MenuItem>
      </TextField>

      <audio ref={audioRef} src={`/${sound}`} preload="auto" />

      <Button
        fullWidth
        onClick={handleTestSound}
        sx={{
          mt: 2,
          mb: 3,
          color: "#a855f7",
          border: "1px solid #a855f7",
          borderRadius: "12px",
        }}
      >
        ▶️ TEST SOUND
      </Button>

      {/* INPUTS */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Default Timer (minutes)"
          type="number"
          value={defaultTime}
          onChange={(e) => setDefaultTime(Number(e.target.value))}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Daily Goal (minutes)"
          type="number"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
          fullWidth
          sx={inputStyle}
        />
      </Box>

      {/* 🔥 PREMIUM SAVE BUTTON */}
      <Button
        fullWidth
        onClick={handleSave}
        disabled={saving}
        sx={{
          mt: 3,
          py: 1.6,
          borderRadius: "18px",
          fontWeight: 800,
          fontSize: "0.95rem",
          letterSpacing: "1px",

          background: saved
            ? "linear-gradient(135deg, #22c55e, #16a34a)"
            : "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)",

          color: "#0f172a",

          boxShadow: saved
            ? "0 8px 25px rgba(34,197,94,0.5)"
            : "0 8px 30px rgba(168,85,247,0.6)",

          transition: "all 0.3s ease",

          "&:hover": {
            transform: "translateY(-3px) scale(1.02)",
            boxShadow: "0 12px 40px rgba(168,85,247,0.8)",
          },

          "&:active": {
            transform: "scale(0.96)",
          },

          "&.Mui-disabled": {
            opacity: 0.6,
            color: "#0f172a",
          },
        }}
      >
        {saving ? "Saving..." : saved ? "Saved ✓" : "SAVE SETTINGS"}
      </Button>

      {/* RESET */}
      <Button
        fullWidth
        onClick={handleReset}
        sx={{
          mt: 2,
          color: "#ef4444",
          fontWeight: 600,
          "&:hover": {
            background: "rgba(239,68,68,0.1)",
          },
        }}
      >
        RESET PROGRESS
      </Button>
    </Paper>
  );
}

// 🎨 STYLES
const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 2,
  borderRadius: "14px",
  background: "rgba(255,255,255,0.05)",
};

const switchStyle = {
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#a855f7",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#a855f7",
  },
};

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#a855f7",
  },
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
  },
};