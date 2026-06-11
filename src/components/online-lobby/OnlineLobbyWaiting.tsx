import React from "react";
import { Typography } from "@mui/material";
import styles from "../../styles/online-lobby.style";

interface OnlineLobbyWaitingProps {
  roomCode: string;
  status: string;
  error: string;
}

const OnlineLobbyWaiting: React.FC<OnlineLobbyWaitingProps> = ({
  roomCode,
  status,
  error,
}): JSX.Element => {
  const classes = styles();

  return (
    <>
      <Typography className={classes.title}>Room Created</Typography>
      <Typography className={classes.subtitle}>
        Share this code with your opponent:
      </Typography>
      <Typography className={classes.roomCode}>{roomCode}</Typography>
      <Typography className={classes.status}>{status}</Typography>
      {error && <Typography className={classes.error}>{error}</Typography>}
    </>
  );
};

export default OnlineLobbyWaiting;
