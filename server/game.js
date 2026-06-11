const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const createBoard = () => [0, 1, 2, 3, 4, 5, 6, 7, 8];

const checkWinner = (board, counter) => {
  const plays = board.reduce(
    (acc, cell, index) => (cell === counter ? acc.concat(index) : acc),
    []
  );

  for (let i = 0; i < WIN_COMBOS.length; i += 1) {
    const combo = WIN_COMBOS[i];
    if (combo.every((index) => plays.includes(index))) {
      return { index: i, player: counter };
    }
  }

  return null;
};

const isDraw = (board) =>
  board.every((cell) => typeof cell !== "number");

const generateRoomCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i += 1) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

module.exports = {
  WIN_COMBOS,
  createBoard,
  checkWinner,
  isDraw,
  generateRoomCode,
};
