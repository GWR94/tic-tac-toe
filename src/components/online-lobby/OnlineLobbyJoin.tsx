import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { OpenRoom } from "../../interfaces/online.i";
import styles from "../../styles/online-lobby.style";

interface OnlineLobbyJoinProps {
  playerName: string;
  joinCode: string;
  error: string;
  openRooms: OpenRoom[];
  onPlayerNameChange: (name: string) => void;
  onJoinCodeChange: (code: string) => void;
  onJoin: (roomCode?: string) => void;
  onRefreshRooms: () => void;
  onBack: () => void;
}

const OnlineLobbyJoin: React.FC<OnlineLobbyJoinProps> = ({
  playerName,
  joinCode,
  error,
  openRooms,
  onPlayerNameChange,
  onJoinCodeChange,
  onJoin,
  onRefreshRooms,
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

      <div className={classes.openRoomsSection}>
        <div className={classes.openRoomsHeader}>
          <Typography className={classes.openRoomsTitle}>
            Open rooms
          </Typography>
          <Button size="small" variant="text" onClick={onRefreshRooms}>
            Refresh
          </Button>
        </div>

        {openRooms.length === 0 ? (
          <Typography className={classes.openRoomsEmpty}>
            No open rooms right now. Enter a code below or create one.
          </Typography>
        ) : (
          <div className={classes.openRoomsList}>
            {openRooms.map((room) => (
              <button
                key={room.roomCode}
                type="button"
                className={classes.openRoomItem}
                onClick={(): void => onJoin(room.roomCode)}
              >
                <span className={classes.openRoomCode}>{room.roomCode}</span>
                <span className={classes.openRoomHost}>
                  Host: {room.hostName}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Typography className={classes.openRoomsDivider}>Or enter a code</Typography>
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
        <Button color="primary" variant="contained" onClick={(): void => onJoin()}>
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
