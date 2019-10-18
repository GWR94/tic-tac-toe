import thunk from "redux-thunk";
import { combineReducers, compose, applyMiddleware, Store, createStore } from "redux";
import { BoardState, PlayerState } from "../interfaces/components.i";
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

export default (): Store => {
  const store: Store<AppState> = createStore(
    combineReducers<AppState>({
      board: boardReducer,
      player: playerReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};
