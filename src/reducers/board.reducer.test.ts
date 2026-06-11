import { describe, it, expect } from "vitest";
import boardReducer from "./board.reducer";
import { ADD_MOVE, RESET_BOARD } from "../interfaces/actions.i";

const baseState = boardReducer(undefined, { type: "@@INIT" });

describe("boardReducer", () => {
  it("starts with nine empty tile indices", () => {
    expect(baseState.tiles).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("stores an updated board after a move", () => {
    const nextBoard = ["X", 1, 2, 3, 4, 5, 6, 7, 8];
    const state = boardReducer(baseState, {
      type: ADD_MOVE,
      tiles: nextBoard,
    });

    expect(state.tiles).toEqual(nextBoard);
  });

  it("resets the board back to empty tiles", () => {
    const played = boardReducer(baseState, {
      type: ADD_MOVE,
      tiles: ["X", "O", "X", "O", "X", "O", "O", "X", "O"],
    });

    expect(boardReducer(played, { type: RESET_BOARD }).tiles).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8,
    ]);
  });
});
