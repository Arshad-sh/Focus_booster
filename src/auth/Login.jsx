import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function Login({ setUser, setIsSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      // ✅ GET ALL USERS (array)
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // ❌ NO USER FOUND
      if (users.length === 0) {
        setError("No account found. Please signup first.");
        setLoading(false);
        return;
      }

      // 🔍 FIND MATCHING USER
      const matchedUser = users.find(
        (u) => u.email === form.email
      );

      if (!matchedUser) {
        setError("Email not registered");
      } else if (matchedUser.password !== form.password) {
        setError("Incorrect password");
      } else {
        // ✅ SAVE SESSION
        localStorage.setItem(
          "currentUser",
          JSON.stringify(matchedUser)
        );

        // ✅ LOGIN SUCCESS
        setUser(matchedUser);
      }

      setLoading(false);
    }, 800);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #0f172a, #020617)",
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 360,
          borderRadius: "25px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.8))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(168,85,247,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          🔐 Welcome Back
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          sx={inputStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon sx={{ color: "#a855f7" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          type={showPass ? "text" : "password"}
          label="Password"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          sx={inputStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#a855f7" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPass(!showPass)}
                  sx={{ color: "#94a3b8" }}
                >
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1, fontSize: "14px" }}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
            color: "#fff",
            textTransform: "uppercase",

            background: "linear-gradient(135deg, #9333ea, #a855f7)",
            boxShadow: "0 0 20px rgba(168,85,247,0.6)",

            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 0 30px rgba(168,85,247,0.9)",
              background: "linear-gradient(135deg, #7e22ce, #9333ea)",
            },

            "&:disabled": {
              color: "#ccc",
              background: "#555",
            },
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Typography mt={3} sx={{ fontSize: "14px", color: "#94a3b8" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => setIsSignup(true)}
            style={{
              cursor: "pointer",
              color: "#a855f7",
              fontWeight: 600,
            }}
          >
            Signup
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

// 🎨 INPUT STYLE (UNCHANGED)
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#a855f7",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#a855f7",
  },
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
  },
};