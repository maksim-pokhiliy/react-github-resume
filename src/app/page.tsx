"use client";

import { TextField, Button, Box } from "@mui/material";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username.trim()) {
      router.push(`/${username}`);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={8}>
      <form
        className="w-full sm:max-w-[400px] flex flex-col gap-10"
        onSubmit={handleSubmit}>
        <TextField
          label="GitHub Username"
          variant="outlined"
          value={username}
          onChange={handleInputChange}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
}
