export type LobbyView = "menu" | "create" | "join" | "waiting";

export interface OnlinePlayer {
  name: string;
  counter: "X" | "O";
}

export interface RoomCreatedPayload {
  roomCode: string;
  playerSlot: 1 | 2;
}

export interface RoomJoinedPayload {
  roomCode: string;
  playerSlot: 1 | 2;
  opponentName: string;
}

export interface PlayerJoinedPayload {
  opponentName: string;
}

export interface GameStartPayload {
  roomCode: string;
  player1: OnlinePlayer;
  player2: OnlinePlayer;
}

export interface JoinErrorPayload {
  message: string;
}

export interface OpenRoom {
  roomCode: string;
  hostName: string;
}

export interface OpenRoomsListPayload {
  rooms: OpenRoom[];
}
