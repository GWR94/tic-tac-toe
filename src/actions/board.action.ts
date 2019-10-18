import {
  RESET_BOARD,
  ADD_MOVE,
  AddMoveAction,
  ResetBoardAction,
} from "../interfaces/actions.i";

export const addMove = (tiles: number[]): AddMoveAction => ({
  type: ADD_MOVE,
  tiles,
});

export const resetBoard = (): ResetBoardAction => ({
  type: RESET_BOARD,
});
