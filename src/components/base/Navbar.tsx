"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Github Resume Builder
        </Typography>

        <Button color="inherit" onClick={handleHomeClick}>
          Home
        </Button>

        <Button
          color="inherit"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer">
          Github
        </Button>
      </Toolbar>
    </AppBar>
  );
}
