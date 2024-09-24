"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface IUser {
  login: string;
  name: string | null;
  public_repos: number;
  created_at: string;
  repos_url: string;
}

interface IRepo {
  id: number;
  name: string;
  html_url: string;
  updated_at: string;
}

export default function ResumePage() {
  const { username } = useParams();

  const [userData, setUserData] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData } = await fetch(`/api/user/${username}`).then(
          (data) => data.json(),
        );

        const reposData = await fetch(userData.repos_url).then((data) =>
          data.json(),
        );

        setUserData(userData);
        setRepos(reposData.slice(0, 10));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}>
      {userData && (
        <>
          <Typography variant="h4" gutterBottom>
            {userData.name || username}
          </Typography>

          <Typography variant="body1" color="textSecondary" gutterBottom>
            Public Repos: {userData.public_repos}
          </Typography>

          <Typography variant="body1" color="textSecondary" gutterBottom>
            Member since: {new Date(userData.created_at).toLocaleDateString()}
          </Typography>

          <Divider sx={{ my: 4 }} />
        </>
      )}

      <Box>
        <Typography variant="h6" gutterBottom>
          Last 10 Repositories:
        </Typography>

        <List>
          {repos.map((repo) => (
            <ListItem
              key={repo.id}
              component="a"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}>
              <ListItemText primary={repo.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
