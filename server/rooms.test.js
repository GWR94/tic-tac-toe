const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { getOpenRooms } = require("./rooms");

const makeRoom = (code, hostName, hasGuest = false) => ({
  code,
  board: [],
  currentPlayer: 1,
  scores: { player1: 0, player2: 0 },
  players: {
    1: { socketId: `host-${code}`, name: hostName, counter: "X" },
    2: hasGuest
      ? { socketId: `guest-${code}`, name: "Guest", counter: "O" }
      : null,
  },
});

describe("getOpenRooms", () => {
  it("returns an empty list when there are no rooms", () => {
    assert.deepEqual(getOpenRooms(new Map()), []);
  });

  it("lists waiting rooms with host names", () => {
    const rooms = new Map([
      ["ABC123", makeRoom("ABC123", "Alice")],
      ["XYZ789", makeRoom("XYZ789", "Bob")],
    ]);

    assert.deepEqual(getOpenRooms(rooms), [
      { roomCode: "ABC123", hostName: "Alice" },
      { roomCode: "XYZ789", hostName: "Bob" },
    ]);
  });

  it("excludes full rooms", () => {
    const rooms = new Map([
      ["OPEN01", makeRoom("OPEN01", "Alice")],
      ["FULL01", makeRoom("FULL01", "Bob", true)],
    ]);

    assert.deepEqual(getOpenRooms(rooms), [
      { roomCode: "OPEN01", hostName: "Alice" },
    ]);
  });

  it("sorts rooms by code", () => {
    const rooms = new Map([
      ["ZZZZZZ", makeRoom("ZZZZZZ", "Zed")],
      ["AAAAAA", makeRoom("AAAAAA", "Amy")],
    ]);

    assert.deepEqual(
      getOpenRooms(rooms).map((room) => room.roomCode),
      ["AAAAAA", "ZZZZZZ"]
    );
  });
});
