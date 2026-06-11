import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import styles from "../../styles/online-lobby.style";

interface OnlineLobbyJoinProps {
  playerName: string;
  joinCode: string;
  error: string;
  onPlayerNameChange: (name: string) => void;
  onJoinCodeChange: (code: string) => void;
  onJoin: () => void;
  onBack: () => void;
}

const OnlineLobbyJoin: React.FC<OnlineLobbyJoinProps> = ({
  playerName,
  joinCode,
  error,
  onPlayerNameChange,
  onJoinCodeChange,
  onJoin,
  onBack,
}): JSX.Element => {
  const classes = styles();

  return (
    <>
      <Typography className={classes.title}>Join a Room</Typography>
      <TextField
        value={playerName}
        className={classes.input}
        onChange={(e): void => onPlayerNameChange(e.target.value)}
        label="Your name"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        value={joinCode}
        className={classes.input}
        onChange={(e): void => onJoinCodeChange(e.target.value.toUpperCase())}
        label="Room code"
        variant="outlined"
        margin="normal"
        inputProps={{ maxLength: 6, style: { letterSpacing: "0.2em" } }}
        fullWidth
      />
      <div className={classes.buttonContainer}>
        <Button color="primary" variant="contained" onClick={onJoin}>
          Join Game
        </Button>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
      </div>
      {error && <Typography className={classes.error}>{error}</Typography>}
    </>
  );
};

export default OnlineLobbyJoin;
