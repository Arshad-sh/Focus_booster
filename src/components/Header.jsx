import { Box, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ user, setUser, isMobile, setOpen }) {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #333",
        color: "white",
      }}
    >
      {/* LEFT SIDE */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        
        {/* 📱 HAMBURGER (ONLY MOBILE) */}
        {isMobile && (
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography>
          Welcome {user?.email} 👋
        </Typography>
      </Box>

      {/* RIGHT SIDE */}
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{
          borderRadius: "10px",
          fontWeight: 600,
        }}
      >
        Logout
      </Button>
    </Box>
  );
}