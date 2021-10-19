import { BoardState, PlayerState } from "./../interfaces/components.i";
import { createStore, combineReducers, compose, Store } from "redux";
import boardReducer from "../reducers/board.reducer";
import playerReducer from "../reducers/player.reducer";
declare global {
  interface Window {
    // eslint-disable-next-line no-undef
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface AppState {
  board: BoardState;
  player: PlayerState;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = (): Store => {
  const store: Store<AppState> = createStore(
    combineReducers<AppState>({
      board: boardReducer,
      player: playerReducer,
    }),
    composeEnhancers()
  );
  return store;
};

export default store;
