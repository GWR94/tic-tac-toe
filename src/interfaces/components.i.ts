export interface TicTacToeState {
  player: PlayerState;
  board: BoardState;
}

export interface PlayerState {
  noPlayers: number;
  player1: Player;
  player2: Player;
  difficulty: number;
  currentPlayer: number;
  readyToPlay: boolean;
  currentTurn: string;
}

export interface BoardState {
  tiles: number[];
}

export interface PlayProps {
  player?: PlayerState;
  board?: BoardState;
  reset?: () => void;
  addMove?: (board) => void;
  changePlayer?: () => void;
  playerOneScore?: () => void;
  playerTwoScore?: () => void;
  updateCurrentTurn?: (turn) => void;
  resetBoard?: () => void;
  resetScore?: () => void;
  setCurrentPlayer?: (player) => void;
}

export interface PlayState {
  disableClicks: boolean;
  gameFinished: boolean;
}

export interface TileProps {
  takeTurn: (id, counter) => boolean;
  takeAITurn: () => void;
  id: string;
  disableClicks: boolean;
  disableTileClicks: () => void;
  currentTurn: React.RefObject<HTMLDivElement>;
}

export interface Player {
  name: string;
  counter: string;
  score?: number;
}

export interface GameWon {
  index: string;
  player: string;
}

export interface Move {
  index?: number;
  score?: number;
}

export interface ScoreBoardProps {
  player1ScoreRef: React.RefObject<HTMLDivElement>;
  player2ScoreRef: React.RefObject<HTMLDivElement>;
  enableTiles: () => void;
}
