import playerReducer from '../reducers/player';
import boardReducer from '../reducers/board';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			player: playerReducer,
			board: boardReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
};
