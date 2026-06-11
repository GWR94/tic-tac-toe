import React, { useState } from "react";
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
  const [copied, setCopied] = useState(false);
  const isCreating = !roomCode;

  const handleCopy = async (): Promise<void> => {
    if (!roomCode) return;

    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      window.setTimeout((): void => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Typography className={classes.title}>
        {isCreating ? "Creating Room" : "Room Created"}
      </Typography>
      <Typography className={classes.subtitle}>
        {isCreating
          ? "Hang tight while we set up your room..."
          : "Share this code with your opponent:"}
      </Typography>
      {isCreating ? (
        <Typography className={classes.status}>Connecting to server...</Typography>
      ) : (
        <div className={classes.roomCodeRow}>
          <span className={classes.roomCode}>{roomCode}</span>
          <button
            type="button"
            className={classes.copyButton}
            onClick={handleCopy}
            aria-label={copied ? "Room code copied" : "Copy room code"}
            title={copied ? "Copied!" : "Copy room code"}
          >
            <i
              className={`fa ${copied ? "fa-check" : "fa-copy"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
      {!isCreating && (
        <Typography className={classes.status}>{status}</Typography>
      )}
      {error && <Typography className={classes.error}>{error}</Typography>}
    </>
  );
};

export default OnlineLobbyWaiting;
