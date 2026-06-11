import React from "react";
import { Button, TextField, Typography } from "@mui/material";

interface OnlineLobbyMenuProps {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

const OnlineLobbyMenu: React.FC<OnlineLobbyMenuProps> = ({
  playerName,
  onPlayerNameChange,
  onCreateRoom,
  onJoinRoom,
}): JSX.Element => {
  return (
    <>
      <Typography className="lobby__title">Online 1v1</Typography>
      <Typography className="lobby__subtitle">
        Create a room and share the code with a friend,
        <br />
        or join an existing room.
      </Typography>
      <TextField
        value={playerName}
        className="lobby__input"
        onChange={(e): void => onPlayerNameChange(e.target.value)}
        label="Your name"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <div className="lobby__button-container">
        <Button color="primary" variant="contained" onClick={onCreateRoom}>
          Create Room
        </Button>
        <Button color="secondary" variant="outlined" onClick={onJoinRoom}>
          Join Room
        </Button>
      </div>
    </>
  );
};

export default OnlineLobbyMenu;
