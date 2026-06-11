import { describe, it, expect } from "vitest";
import playerReducer from "./player.reducer";
import {
  CHANGE_PLAYER_AFTER_MOVE,
  RESET_GAME,
  SET_NUM_PLAYERS,
  SETUP_PLAYERS,
  PLAYER_ONE_SCORE,
  PLAYER_TWO_SCORE,
  RESET_SCORE,
  SET_PLAYER_SCORES,
} from "../interfaces/actions.i";

const baseState = playerReducer(undefined, { type: "@@INIT" });

describe("playerReducer", () => {
  it("sets the selected game mode", () => {
    const state = playerReducer(baseState, {
      type: SET_NUM_PLAYERS,
      numPlayers: 3,
    });

    expect(state.noPlayers).toBe(3);
  });

  it("starts a local game with player details", () => {
    const state = playerReducer(baseState, {
      type: SETUP_PLAYERS,
      player1: { name: "Alice", counter: "X" },
      player2: { name: "Bob", counter: "O" },
      difficulty: 2,
    });

    expect(state.readyToPlay).toBe(true);
    expect(state.player1.name).toBe("Alice");
    expect(state.player2.name).toBe("Bob");
    expect(state.currentTurn).toBe("It's Alice's turn.");
  });

  it("starts an online game with room metadata", () => {
    const state = playerReducer(baseState, {
      type: SETUP_PLAYERS,
      player1: { name: "Alice", counter: "X" },
      player2: { name: "Bob", counter: "O" },
      difficulty: 2,
      roomCode: "ABC123",
      onlinePlayerSlot: 1,
    });

    expect(state.noPlayers).toBe(3);
    expect(state.roomCode).toBe("ABC123");
    expect(state.onlinePlayerSlot).toBe(1);
  });

  it("alternates the current player after a move", () => {
    const playing = playerReducer(baseState, {
      type: SETUP_PLAYERS,
      player1: { name: "Alice", counter: "X" },
      player2: { name: "Bob", counter: "O" },
      difficulty: 2,
    });

    const next = playerReducer(playing, { type: CHANGE_PLAYER_AFTER_MOVE });
    expect(next.currentPlayer).toBe(2);
  });

  it("increments scores and sets win messages", () => {
    const playing = playerReducer(baseState, {
      type: SETUP_PLAYERS,
      player1: { name: "Alice", counter: "X" },
      player2: { name: "Bob", counter: "O" },
      difficulty: 2,
    });

    const afterP1Win = playerReducer(playing, { type: PLAYER_ONE_SCORE });
    expect(afterP1Win.player1.score).toBe(1);
    expect(afterP1Win.currentTurn).toBe("Alice wins!");

    const afterP2Win = playerReducer(playing, { type: PLAYER_TWO_SCORE });
    expect(afterP2Win.player2.score).toBe(1);
    expect(afterP2Win.currentTurn).toBe("Bob wins!");
  });

  it("resets scores without leaving the game", () => {
    const scored = playerReducer(baseState, {
      type: SET_PLAYER_SCORES,
      player1Score: 2,
      player2Score: 1,
    });

    const reset = playerReducer(scored, { type: RESET_SCORE });
    expect(reset.player1.score).toBe(0);
    expect(reset.player2.score).toBe(0);
  });

  it("returns to the default menu state on reset", () => {
    const playing = playerReducer(baseState, {
      type: SETUP_PLAYERS,
      player1: { name: "Alice", counter: "X" },
      player2: { name: "Bob", counter: "O" },
      difficulty: 2,
      roomCode: "ABC123",
      onlinePlayerSlot: 2,
    });

    expect(playerReducer(playing, { type: RESET_GAME })).toEqual(baseState);
  });
});
