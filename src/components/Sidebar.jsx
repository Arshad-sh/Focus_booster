import { Box, Typography, Drawer } from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import TimerIcon from "@mui/icons-material/Timer";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Sidebar({
  page,
  setPage,
  isMobile,
  open,
  setOpen,
}) {
  const menu = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Timer", icon: <TimerIcon /> },
    { name: "Quotes", icon: <FormatQuoteIcon /> },
    { name: "Progress", icon: <BarChartIcon /> },
    { name: "Analytics", icon: <BarChartIcon /> },
    { name: "Profile", icon: <AccountCircleIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
  ];

  const sidebarUI = (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        p: 3,

        // 🔥 GLASS + DEPTH
        background:
          "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(2,6,23,0.95))",
        backdropFilter: "blur(20px)",

        borderRight: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 0 30px rgba(168,85,247,0.05)",

        color: "white",
      }}
    >
      {/* 🔥 BRAND TITLE */}
      <Typography
        variant="h6"
        sx={{
          mb: 5,
          fontWeight: 700,
          letterSpacing: "1px",

          background: "linear-gradient(90deg, #a855f7, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ⚡ Focus Booster
      </Typography>

      {/* MENU */}
      {menu.map((item) => {
        const active = page === item.name;

        return (
          <Box
            key={item.name}
            onClick={() => {
              setPage(item.name);
              if (isMobile) setOpen(false);
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.6,
              mb: 1.2,
              borderRadius: "14px",
              cursor: "pointer",

              transition: "all 0.25s ease",

              position: "relative",

              // 🔥 ACTIVE STYLE (GLOW BAR)
              background: active
                ? "rgba(168,85,247,0.15)"
                : "transparent",

              boxShadow: active
                ? "0 0 20px rgba(168,85,247,0.35)"
                : "none",

              color: active ? "#fff" : "#94a3b8",

              "& svg": {
                color: active ? "#a855f7" : "#94a3b8",
                transition: "0.3s",
              },

              // 🔥 LEFT GLOW LINE
              "&::before": active
                ? {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    height: "60%",
                    width: "4px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(180deg, #a855f7, #6366f1)",
                  }
                : {},

              // 🔥 HOVER EFFECT
              "&:hover": {
                background:
                  "rgba(168,85,247,0.1)",
                transform: "translateX(6px) scale(1.02)",

                "& svg": {
                  color: "#a855f7",
                },
              },
            }}
          >
            {item.icon}
            <Typography fontSize="14px" fontWeight={500}>
              {item.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );

  // 📱 MOBILE
  if (isMobile) {
    return (
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "transparent",
          },
        }}
      >
        {sidebarUI}
      </Drawer>
    );
  }

  // 💻 DESKTOP
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      {sidebarUI}
    </Box>
  );
}