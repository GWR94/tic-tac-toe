import {
  CHANGE_PLAYER_AFTER_MOVE,
  ChangePlayerAction,
  RESET_GAME,
  ResetGameAction,
  SETUP_PLAYERS,
  SetupPlayersAction,
  SET_NUM_PLAYERS,
  SetNumPlayersAction,
  PLAYER_ONE_SCORE,
  PLAYER_TWO_SCORE,
  PlayerOneScoreAction,
  PlayerTwoScoreAction,
  UPDATE_CURRENT_TURN,
  UpdateCurrentTurnAction,
  RESET_SCORE,
  ResetScoreAction,
  SET_CURRENT_PLAYER,
  SetCurrentPlayerAction,
} from "../interfaces/actions.i";
import { Player } from "../interfaces/components.i";

export const changePlayer = (): ChangePlayerAction => ({
  type: CHANGE_PLAYER_AFTER_MOVE,
});

export const reset = (): ResetGameAction => ({
  type: RESET_GAME,
});

export const setNumPlayers = (numPlayers: number): SetNumPlayersAction => ({
  type: SET_NUM_PLAYERS,
  numPlayers,
});

export const setCurrentPlayer = (player: number): SetCurrentPlayerAction => ({
  type: SET_CURRENT_PLAYER,
  player,
});

export const setupPlayers = (
  player1: Player,
  player2: Player,
  difficulty: number
): SetupPlayersAction => ({
  type: SETUP_PLAYERS,
  player1,
  player2,
  difficulty,
});

export const playerOneScore = (): PlayerOneScoreAction => ({
  type: PLAYER_ONE_SCORE,
});

export const playerTwoScore = (): PlayerTwoScoreAction => ({
  type: PLAYER_TWO_SCORE,
});

export const resetScore = (): ResetScoreAction => ({
  type: RESET_SCORE,
});

export const updateCurrentTurn = (turn: string): UpdateCurrentTurnAction => ({
  type: UPDATE_CURRENT_TURN,
  turn,
});
