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

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Signup({ setUser, setIsSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      return setError("All fields are required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }

    // ✅ GET EXISTING USERS
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ❌ CHECK IF EMAIL ALREADY EXISTS
    const alreadyExists = users.find(
      (u) => u.email === form.email
    );

    if (alreadyExists) {
      return setError("Email already registered");
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
    };

    // ✅ ADD NEW USER
    const updatedUsers = [...users, newUser];

    // ✅ SAVE ARRAY
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // ✅ REDIRECT TO LOGIN
    setIsSignup(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 380,
          borderRadius: "25px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.85))",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(168,85,247,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          🚀 Create Account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          sx={inputStyle}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon sx={{ color: "#a855f7" }} />
              </InputAdornment>
            ),
          }}
        />

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
                <IconButton onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          type={showPass ? "text" : "password"}
          label="Confirm Password"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, confirm: e.target.value })
          }
          sx={inputStyle}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button fullWidth onClick={handleSignup} sx={btnStyle}>
          Sign Up
        </Button>

        <Typography mt={3}>
          Already have an account?{" "}
          <span
            onClick={() => setIsSignup(false)}
            style={{ color: "#a855f7", cursor: "pointer" }}
          >
            Login
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

// 🎨 STYLES SAME
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    color: "white",
  },
};

const btnStyle = {
  mt: 3,
  py: 1.3,
  borderRadius: "12px",
  fontWeight: 700,
  color: "#fff",
  background: "linear-gradient(135deg, #9333ea, #a855f7)",
};