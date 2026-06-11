const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  createBoard,
  checkWinner,
  isDraw,
  generateRoomCode,
} = require("./game");

describe("createBoard", () => {
  it("returns nine empty tile indices", () => {
    assert.deepEqual(createBoard(), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});

describe("checkWinner", () => {
  it("detects a row win", () => {
    const board = ["X", "X", "X", 3, 4, 5, 6, 7, 8];
    assert.deepEqual(checkWinner(board, "X"), { index: 0, player: "X" });
  });

  it("detects a column win", () => {
    const board = ["O", 1, 2, "O", 4, 5, "O", 7, 8];
    assert.deepEqual(checkWinner(board, "O"), { index: 3, player: "O" });
  });

  it("detects a diagonal win", () => {
    const board = ["X", 1, 2, 3, "X", 5, 6, 7, "X"];
    assert.deepEqual(checkWinner(board, "X"), { index: 6, player: "X" });
  });

  it("returns null when there is no winner", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    assert.equal(checkWinner(board, "X"), null);
  });
});

describe("isDraw", () => {
  it("returns true when the board is full with no winner", () => {
    const board = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    assert.equal(isDraw(board), true);
  });

  it("returns false when empty squares remain", () => {
    assert.equal(isDraw(createBoard()), false);
  });
});

describe("generateRoomCode", () => {
  it("returns a 6-character code from the allowed charset", () => {
    const code = generateRoomCode();
    assert.match(code, /^[A-HJ-NP-Z2-9]{6}$/);
  });
});
