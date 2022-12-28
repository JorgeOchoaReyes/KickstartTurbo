import * as React from "react";
import * as MUI from "@mui/material";

interface CardProps {
  title: string;
  body: string;
}

export const Card: React.FC<CardProps> = ({ title, body }) => {
  return (
    <MUI.Card>
      <MUI.CardHeader title={title} />
      <MUI.CardContent>
        <MUI.Typography>{body}</MUI.Typography>
      </MUI.CardContent>
    </MUI.Card>
  );
};
