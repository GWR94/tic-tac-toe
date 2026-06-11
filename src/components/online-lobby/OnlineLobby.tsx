import React from "react";
import { useOnlineLobby } from "../../hooks/useOnlineLobby";
import styles from "../../styles/online-lobby.style";
import OnlineLobbyJoin from "./OnlineLobbyJoin";
import OnlineLobbyMenu from "./OnlineLobbyMenu";
import OnlineLobbyWaiting from "./OnlineLobbyWaiting";

const OnlineLobby: React.FC = (): JSX.Element => {
  const classes = styles();
  const {
    view,
    playerName,
    setPlayerName,
    roomCode,
    joinCode,
    setJoinCode,
    status,
    error,
    openRooms,
    refreshOpenRooms,
    handleBack,
    handleCreateRoom,
    handleJoinRoom,
    goToJoin,
    goToMenu,
  } = useOnlineLobby();

  return (
    <div className={`${classes.container} animate__animated animate__fadeIn`}>
      <i
        className={`fa fa-undo ${classes.backButton}`}
        onClick={handleBack}
        role="button"
        tabIndex={0}
      />
      {view === "menu" && (
        <OnlineLobbyMenu
          playerName={playerName}
          onPlayerNameChange={setPlayerName}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={goToJoin}
        />
      )}
      {view === "join" && (
        <OnlineLobbyJoin
          playerName={playerName}
          joinCode={joinCode}
          error={error}
          openRooms={openRooms}
          onPlayerNameChange={setPlayerName}
          onJoinCodeChange={setJoinCode}
          onJoin={handleJoinRoom}
          onRefreshRooms={refreshOpenRooms}
          onBack={goToMenu}
        />
      )}
      {(view === "create" || view === "waiting") && (
        <OnlineLobbyWaiting roomCode={roomCode} status={status} error={error} />
      )}
    </div>
  );
};

export default OnlineLobby;
