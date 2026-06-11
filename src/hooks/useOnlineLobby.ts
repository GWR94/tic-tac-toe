import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { disconnectSocket, getSocket } from "../services/socket";
import * as actions from "../actions/player.action";
import {
  GameStartPayload,
  JoinErrorPayload,
  LobbyView,
  PlayerJoinedPayload,
  RoomCreatedPayload,
  RoomJoinedPayload,
} from "../interfaces/online.i";

export interface UseOnlineLobbyReturn {
  view: LobbyView;
  playerName: string;
  setPlayerName: (name: string) => void;
  roomCode: string;
  joinCode: string;
  setJoinCode: (code: string) => void;
  status: string;
  error: string;
  handleBack: () => void;
  handleCreateRoom: () => void;
  handleJoinRoom: () => void;
  goToJoin: () => void;
  goToMenu: () => void;
}

export const useOnlineLobby = (): UseOnlineLobbyReturn => {
  const dispatch = useDispatch();
  const playerSlotRef = useRef<1 | 2 | null>(null);

  const [view, setView] = useState<LobbyView>("menu");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const socket = getSocket();

    const onRoomCreated = (data: RoomCreatedPayload): void => {
      playerSlotRef.current = data.playerSlot;
      setRoomCode(data.roomCode);
      setView("waiting");
      setStatus("Waiting for an opponent to join...");
      setError("");
    };

    const onRoomJoined = (data: RoomJoinedPayload): void => {
      playerSlotRef.current = data.playerSlot;
      setRoomCode(data.roomCode);
      setStatus(`Matched with ${data.opponentName}. Starting game...`);
      setError("");
    };

    const onPlayerJoined = (data: PlayerJoinedPayload): void => {
      setStatus(`${data.opponentName} joined! Starting game...`);
      setError("");
    };

    const onGameStart = (data: GameStartPayload): void => {
      if (!playerSlotRef.current) return;

      dispatch(
        actions.setupOnlineGame(
          data.player1,
          data.player2,
          data.roomCode,
          playerSlotRef.current
        )
      );
    };

    const onJoinError = (data: JoinErrorPayload): void => {
      setError(data.message);
      setStatus("");
    };

    socket.on("room-created", onRoomCreated);
    socket.on("room-joined", onRoomJoined);
    socket.on("player-joined", onPlayerJoined);
    socket.on("game-start", onGameStart);
    socket.on("join-error", onJoinError);

    return () => {
      socket.off("room-created", onRoomCreated);
      socket.off("room-joined", onRoomJoined);
      socket.off("player-joined", onPlayerJoined);
      socket.off("game-start", onGameStart);
      socket.off("join-error", onJoinError);
    };
  }, [dispatch]);

  const handleBack = useCallback((): void => {
    getSocket().emit("leave-room");
    disconnectSocket();
    dispatch(actions.reset());
  }, [dispatch]);

  const handleCreateRoom = useCallback((): void => {
    setError("");
    setView("create");
    getSocket().emit("create-room", {
      playerName: playerName.trim() || "Player 1",
    });
  }, [playerName]);

  const handleJoinRoom = useCallback((): void => {
    setError("");
    if (joinCode.trim().length < 6) {
      setError("Please enter a valid 6-character room code.");
      return;
    }
    getSocket().emit("join-room", {
      roomCode: joinCode.trim().toUpperCase(),
      playerName: playerName.trim() || "Player 2",
    });
  }, [joinCode, playerName]);

  const goToJoin = useCallback((): void => setView("join"), []);
  const goToMenu = useCallback((): void => setView("menu"), []);

  return {
    view,
    playerName,
    setPlayerName,
    roomCode,
    joinCode,
    setJoinCode,
    status,
    error,
    handleBack,
    handleCreateRoom,
    handleJoinRoom,
    goToJoin,
    goToMenu,
  };
};
