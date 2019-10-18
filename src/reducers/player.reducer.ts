import PlayerActionTypes, {
  CHANGE_PLAYER_AFTER_MOVE,
  RESET,
  SETUP_PLAYERS,
  SET_NUM_PLAYERS,
  PLAYER_ONE_SCORE,
  PLAYER_TWO_SCORE,
  RESET_SCORE,
  UPDATE_CURRENT_TURN,
  SET_CURRENT_PLAYER,
} from "../interfaces/actions.i";
import { PlayerState } from "../interfaces/components.i";

const defaultPlayerState: PlayerState = {
  noPlayers: undefined,
  player1: {
    name: undefined,
    counter: "X",
    score: 0,
  },
  player2: {
    name: undefined,
    counter: "O",
    score: 0,
  },
  difficulty: 2,
  currentPlayer: 1,
  readyToPlay: false,
  currentTurn: undefined,
};

export default (state = defaultPlayerState, action: PlayerActionTypes): PlayerState => {
  switch (action.type) {
    case CHANGE_PLAYER_AFTER_MOVE:
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      };
    case RESET:
      return defaultPlayerState;
    case SET_NUM_PLAYERS:
      return {
        ...state,
        noPlayers: action.numPlayers,
      };
    case SETUP_PLAYERS:
      return {
        ...state,
        player1: {
          ...state.player1,
          ...action.player1,
        },
        player2: {
          ...state.player2,
          ...action.player2,
        },
        difficulty: action.difficulty,
        readyToPlay: true,
        currentTurn: `It's ${action.player1.name}'s turn.`,
      };
    case PLAYER_ONE_SCORE:
      return {
        ...state,
        player1: {
          ...state.player1,
          score: state.player1.score + 1,
        },
        currentPlayer: 2,
        currentTurn: `${state.player1.name} wins!`,
      };
    case PLAYER_TWO_SCORE:
      return {
        ...state,
        player2: {
          ...state.player2,
          score: state.player2.score + 1,
        },
        currentPlayer: 1,
        currentTurn: `${state.player2.name} wins!`,
      };
    case RESET_SCORE:
      return {
        ...state,
        player1: {
          ...state.player1,
          score: 0,
        },
        player2: {
          ...state.player2,
          score: 0,
        },
      };
    case UPDATE_CURRENT_TURN:
      return {
        ...state,
        currentTurn: action.turn,
      };
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: action.player,
      };
    default:
      return state;
  }
};
