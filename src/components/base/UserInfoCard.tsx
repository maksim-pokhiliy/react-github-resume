"use client";

import { Card, CardContent, Typography } from "@mui/material";

export default function UserInfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        <Typography variant="body1">{value}</Typography>
      </CardContent>
    </Card>
  );
}
