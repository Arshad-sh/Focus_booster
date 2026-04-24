import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TimerCard from "./components/TimerCard";
import QuoteCard from "./components/QuoteCard";
import ProgressCard from "./components/ProgressCard";
import Profile from "./components/Profile";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import AICoach from "./components/AICoach";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

export default function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [page, setPage] = useState("Dashboard");

  // 🔥 MOBILE DETECT
  const isMobile = useMediaQuery("(max-width:900px)");

  // 🔥 SIDEBAR STATE
  const [open, setOpen] = useState(false);

  // 🔐 Load user
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) setUser(current);
  }, []);

  // 🔐 AUTH
  if (!user) {
    return isSignup ? (
      <Signup setUser={setUser} setIsSignup={setIsSignup} />
    ) : (
      <Login setUser={setUser} setIsSignup={setIsSignup} />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#020617",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <Sidebar
        page={page}
        setPage={setPage}
        isMobile={isMobile}
        open={open}
        setOpen={setOpen}
      />

      {/* MAIN */}
      <Box sx={{ flex: 1, width: "100%" }}>
        <Header
          user={user}
          setUser={setUser}
          isMobile={isMobile}
          setOpen={setOpen} // 🔥 IMPORTANT
        />

        {/* CONTENT */}
        <Box
          sx={{
            mt: 6,
            px: { xs: 2, md: 4 },
          }}
        >
          {/* DASHBOARD */}
          {page === "Dashboard" && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 4,
                alignItems: "stretch",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TimerCard />
              </Box>

              <Box sx={{ display: "flex" }}>
                <QuoteCard />
              </Box>

              <Box sx={{ display: "flex" }}>
                <ProgressCard />
              </Box>
              <Box sx={{ display: "flex" }}>
                <AICoach />
              </Box>
              
            </Box>
          )}

          {/* TIMER */}
          {page === "Timer" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TimerCard />
            </Box>
          )}

          {/* QUOTES */}
          {page === "Quotes" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <QuoteCard />
            </Box>
          )}

          {/* PROGRESS */}
          {page === "Progress" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ProgressCard />
            </Box>
          )}

          {/* ANALYTICS */}
          {page === "Analytics" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Analytics />
            </Box>
          )}

          {/* PROFILE */}
          {page === "Profile" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Profile user={user} />
            </Box>
          )}

          {/* SETTINGS */}
          {page === "Settings" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Settings />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}