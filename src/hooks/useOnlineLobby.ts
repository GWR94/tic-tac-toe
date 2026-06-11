import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { disconnectSocket, getSocket } from "../services/socket";
import * as actions from "../actions/player.action";
import {
  GameStartPayload,
  JoinErrorPayload,
  LobbyView,
  OpenRoomsListPayload,
  OpenRoom,
  PlayerJoinedPayload,
  RoomCreatedPayload,
  RoomJoinedPayload,
} from "../interfaces/online.i";

const fetchOpenRooms = async (): Promise<OpenRoom[]> => {
  const response = await fetch("/api/open-rooms");

  if (!response.ok) {
    throw new Error("Failed to load open rooms.");
  }

  const data: OpenRoomsListPayload = await response.json();
  return data.rooms;
};

const requestOpenRoomsViaSocket = (): void => {
  const socket = getSocket();
  const emitList = (): void => {
    socket.emit("list-open-rooms");
  };

  if (socket.connected) {
    emitList();
    return;
  }

  socket.once("connect", emitList);
};

export interface UseOnlineLobbyReturn {
  view: LobbyView;
  playerName: string;
  setPlayerName: (name: string) => void;
  roomCode: string;
  joinCode: string;
  setJoinCode: (code: string) => void;
  status: string;
  error: string;
  openRooms: OpenRoom[];
  refreshOpenRooms: () => void;
  handleBack: () => void;
  handleCreateRoom: () => void;
  handleJoinRoom: (roomCode?: string) => void;
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
  const [openRooms, setOpenRooms] = useState<OpenRoom[]>([]);

  const refreshOpenRooms = useCallback((): void => {
    fetchOpenRooms()
      .then(setOpenRooms)
      .catch(() => {
        requestOpenRoomsViaSocket();
      });
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) {
      socket.connect();
    }

    const onOpenRoomsList = (data: OpenRoomsListPayload): void => {
      setOpenRooms(data.rooms);
    };

    const onOpenRoomsChanged = (): void => {
      if (view === "join") {
        refreshOpenRooms();
      }
    };

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
    socket.on("open-rooms-list", onOpenRoomsList);
    socket.on("open-rooms-changed", onOpenRoomsChanged);

    return () => {
      socket.off("room-created", onRoomCreated);
      socket.off("room-joined", onRoomJoined);
      socket.off("player-joined", onPlayerJoined);
      socket.off("game-start", onGameStart);
      socket.off("join-error", onJoinError);
      socket.off("open-rooms-list", onOpenRoomsList);
      socket.off("open-rooms-changed", onOpenRoomsChanged);
    };
  }, [dispatch, refreshOpenRooms, view]);

  useEffect(() => {
    if (view !== "join") return;

    refreshOpenRooms();
    const intervalId = window.setInterval(refreshOpenRooms, 5000);

    return () => window.clearInterval(intervalId);
  }, [view, refreshOpenRooms]);

  const handleBack = useCallback((): void => {
    getSocket().emit("leave-room");
    disconnectSocket();
    dispatch(actions.reset());
  }, [dispatch]);

  const handleCreateRoom = useCallback((): void => {
    setError("");
    setView("create");
    const socket = getSocket();
    const createRoom = (): void => {
      socket.emit("create-room", {
        playerName: playerName.trim() || "Player 1",
      });
    };

    if (socket.connected) {
      createRoom();
    } else {
      socket.once("connect", createRoom);
    }
  }, [playerName]);

  const handleJoinRoom = useCallback(
    (roomCode?: string): void => {
      setError("");
      const code = (roomCode || joinCode).trim().toUpperCase();
      if (code.length < 6) {
        setError("Please enter a valid 6-character room code.");
        return;
      }
      setJoinCode(code);

      const socket = getSocket();
      const joinRoom = (): void => {
        socket.emit("join-room", {
          roomCode: code,
          playerName: playerName.trim() || "Player 2",
        });
      };

      if (socket.connected) {
        joinRoom();
      } else {
        socket.once("connect", joinRoom);
      }
    },
    [joinCode, playerName]
  );

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
    openRooms,
    refreshOpenRooms,
    handleBack,
    handleCreateRoom,
    handleJoinRoom,
    goToJoin,
    goToMenu,
  };
};
