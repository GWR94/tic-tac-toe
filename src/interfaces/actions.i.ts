import { Player } from "./components.i";

// * Board Actions * //
export const ADD_MOVE = "ADD_MOVE";
export const RESET_BOARD = "RESET_BOARD";

export interface AddMoveAction {
  type: typeof ADD_MOVE;
  tiles: number[];
}

export interface ResetBoardAction {
  type: typeof RESET_BOARD;
}

export interface OpponentDispatchProps {
  setNumPlayers: (num) => SetNumPlayersAction;
}

// * Player Actions * //
export const CHANGE_PLAYER_AFTER_MOVE = "CHANGE_PLAYER_AFTER_MOVE";
export const RESET = "RESET";
export const SET_NUM_PLAYERS = "SET_NUM_PLAYERS";
export const SETUP_PLAYERS = "SETUP_PLAYERS";
export const PLAYER_ONE_SCORE = "PLAYER_ONE_SCORE";
export const PLAYER_TWO_SCORE = "PLAYER_TWO_SCORE";
export const UPDATE_CURRENT_TURN = "UPDATE_CURRENT_TURN";
export const RESET_SCORE = "RESET_SCORE";
export const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";

export interface ChangePlayerAction {
  type: typeof CHANGE_PLAYER_AFTER_MOVE;
}

export interface ResetAction {
  type: typeof RESET;
}

export interface SetNumPlayersAction {
  type: typeof SET_NUM_PLAYERS;
  numPlayers: number;
}

export interface SetupPlayersAction {
  type: typeof SETUP_PLAYERS;
  player1: Player;
  player2: Player;
  difficulty: number;
}

export interface PlayerOneScoreAction {
  type: typeof PLAYER_ONE_SCORE;
}

export interface PlayerTwoScoreAction {
  type: typeof PLAYER_TWO_SCORE;
}

export interface ResetScoreAction {
  type: typeof RESET_SCORE;
}

export interface UpdateCurrentTurnAction {
  type: typeof UPDATE_CURRENT_TURN;
  turn: string;
}

export interface SetCurrentPlayerAction {
  type: typeof SET_CURRENT_PLAYER;
  player: number;
}

export interface NameDispatchProps {
  reset: () => ResetAction;
  setupPlayers: (player1, player2, difficulty) => SetupPlayersAction;
  noPlayers?: number;
}

export interface PlayDispatchProps {
  reset: () => ResetAction;
  changePlayer: () => ChangePlayerAction;
  updateCurrentTurn: (turn) => UpdateCurrentTurnAction;
  playerOneScore: () => PlayerOneScoreAction;
  playerTwoScore: () => PlayerTwoScoreAction;
  resetScore: () => ResetScoreAction;
  setCurrentPlayer: (player) => SetCurrentPlayerAction;
  resetBoard: () => ResetBoardAction;
  addMove: (board) => AddMoveAction;
}

declare type ActionTypes =
  | ChangePlayerAction
  | ResetAction
  | SetNumPlayersAction
  | SetupPlayersAction
  | PlayerOneScoreAction
  | PlayerTwoScoreAction
  | ResetScoreAction
  | UpdateCurrentTurnAction
  | SetCurrentPlayerAction
  | AddMoveAction
  | ResetBoardAction;

export { ActionTypes as default };
