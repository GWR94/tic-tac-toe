import React, { useState } from "react";
import { Typography } from "@mui/material";

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
      <Typography className="lobby__title">
        {isCreating ? "Creating Room" : "Room Created"}
      </Typography>
      <Typography className="lobby__subtitle">
        {isCreating
          ? "Hang tight while we set up your room..."
          : "Share this code with your opponent:"}
      </Typography>
      {isCreating ? (
        <Typography className="lobby__status">Connecting to server...</Typography>
      ) : (
        <div className="lobby__room-code-row">
          <span className="lobby__room-code">{roomCode}</span>
          <button
            type="button"
            className="lobby__copy-button"
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
        <Typography className="lobby__status">{status}</Typography>
      )}
      {error && <Typography className="lobby__error">{error}</Typography>}
    </>
  );
};

export default OnlineLobbyWaiting;
