import { BoardState } from "../interfaces/components.i";
import {
  AddMoveAction,
  ResetBoardAction,
  RESET_BOARD,
  ADD_MOVE,
} from "../interfaces/actions.i";

const defaultBoardState: BoardState = {
  tiles: Array.from(Array(9).keys()),
};

type BoardActionsTypes = AddMoveAction | ResetBoardAction;

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = defaultBoardState,
  action: BoardActionsTypes
): BoardState => {
  switch (action.type) {
    case ADD_MOVE:
      return {
        tiles: action.tiles,
      };
    case RESET_BOARD:
      return {
        tiles: Array.from(Array(9).keys()),
      };
    default:
      return state;
  }
};
