"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Colors,
} from "chart.js";

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

ChartJS.register(ArcElement, Tooltip, Legend, Title, Colors);

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
  language: string | null;
}

export default function ResumePage() {
  const { username } = useParams();

  const [userData, setUserData] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const languagesCount = useMemo(() => {
    let output = 0;

    if (repos) {
      output = repos.reduce((acc: any, repo) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
      }, {});
    }

    return output;
  }, [repos]);

  const languagesData = useMemo(() => {
    const output = {
      labels: Object.keys(languagesCount),
      datasets: [
        {
          data: Object.values(languagesCount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return output;
  }, [languagesCount]);

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

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h6">Languages Used:</Typography>
        {Object.keys(languagesCount).length > 0 ? (
          <Pie data={languagesData} />
        ) : (
          <Typography>No languages data available.</Typography>
        )}
      </Box>
    </Box>
  );
}
