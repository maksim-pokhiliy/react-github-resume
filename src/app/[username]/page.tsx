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
import UserInfoCard from "@root/components/base/UserInfoCard";

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
  const [error, setError] = useState<string>("");

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
        const userResponse = await fetch(`/api/user/${username}`);

        if (!userResponse.ok) {
          throw new Error(`${userResponse.status}`);
        }

        const { data: userData }: { data: IUser } = await userResponse.json();

        const reposResponse = await fetch(userData?.repos_url);

        if (!reposResponse.ok) {
          throw new Error(`${reposResponse.status}`);
        }

        const reposData = await reposResponse.json();

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
    return (
      <Alert severity="error">
        {error === "404"
          ? `User "${username}" not found. Please check the username and try again.`
          : error}
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}>
      {userData && (
        <>
          <UserInfoCard
            title="Name"
            value={userData.name || (username as string)}
          />

          <UserInfoCard
            title="Public Repos"
            value={String(userData.public_repos)}
          />

          <UserInfoCard
            title="Member since"
            value={new Date(userData.created_at).toLocaleDateString()}
          />

          <Box mt={2}>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary">
                View GitHub Profile
              </Typography>
            </a>
          </Box>

          <Divider sx={{ my: 4 }} />
        </>
      )}

      <Box>
        <Typography variant="h6" gutterBottom>
          Last 10 Repositories:
        </Typography>

        <List>
          {repos.length > 0 ? (
            repos.map((repo) => (
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
                  textDecoration: "none",
                  color: "inherit",
                }}>
                <ListItemText primary={repo.name} />
              </ListItem>
            ))
          ) : (
            <Typography>
              No public repositories available for this user.
            </Typography>
          )}
        </List>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ width: { xs: "100%", md: "75%" }, margin: "0 auto" }}>
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
