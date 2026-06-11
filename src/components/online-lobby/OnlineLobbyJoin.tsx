import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { OpenRoom } from "../../interfaces/online.i";

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
  return (
    <>
      <Typography className="lobby__title">Join a Room</Typography>
      <TextField
        value={playerName}
        className="lobby__input"
        onChange={(e): void => onPlayerNameChange(e.target.value)}
        label="Your name"
        variant="outlined"
        margin="normal"
        fullWidth
      />

      <div className="lobby__open-rooms-section">
        <div className="lobby__open-rooms-header">
          <Typography className="lobby__open-rooms-title">
            Open rooms
          </Typography>
          <Button size="small" variant="text" onClick={onRefreshRooms}>
            Refresh
          </Button>
        </div>

        {openRooms.length === 0 ? (
          <Typography className="lobby__open-rooms-empty">
            No open rooms right now. Enter a code below or create one.
          </Typography>
        ) : (
          <div className="lobby__open-rooms-list">
            {openRooms.map((room) => (
              <button
                key={room.roomCode}
                type="button"
                className="lobby__open-room-item"
                onClick={(): void => onJoin(room.roomCode)}
              >
                <span className="lobby__open-room-code">{room.roomCode}</span>
                <span className="lobby__open-room-host">
                  Host: {room.hostName}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Typography className="lobby__open-rooms-divider">Or enter a code</Typography>
      <TextField
        value={joinCode}
        className="lobby__input"
        onChange={(e): void => onJoinCodeChange(e.target.value.toUpperCase())}
        label="Room code"
        variant="outlined"
        margin="normal"
        inputProps={{ maxLength: 6, style: { letterSpacing: "0.2em" } }}
        fullWidth
      />
      <div className="lobby__button-container">
        <Button color="primary" variant="contained" onClick={(): void => onJoin()}>
          Join Game
        </Button>
        <Button variant="text" onClick={onBack}>
          Back
        </Button>
      </div>
      {error && <Typography className="lobby__error">{error}</Typography>}
    </>
  );
};

export default OnlineLobbyJoin;
