"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

export default function BreadcrumbsComponent() {
  const router = useRouter();
  const { username } = useParams();

  const handleNavigateHome = () => {
    router.push("/");
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        onClick={handleNavigateHome}
        sx={{ cursor: "pointer" }}>
        Home
      </Link>

      {username && <Typography color="textPrimary">{username}</Typography>}
    </Breadcrumbs>
  );
}
