const defaultBoardState = {
	boardSize: 9,
	tiles: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
	tilesValues: [0, 0, 0, 0, 0, 0, 0, 0, 0]
};

export default (state = defaultBoardState, action) => {
	switch (action.type) {
	case 'ADD_MOVE':
		return {
			...state,
			tiles: state.tiles.map((item, tile) => {
				return tile === action.tile ? action.currentPlayer : item;
			}),
			tilesValues: state.tilesValues.map((item, tile) => {
				return tile === action.tile ? action.currentPlayer : item;
			})
		};
	case 'CHANGE_SIZE':
		return {
			boardSize: action.boardSize,
			tiles: action.newBoard,
		};
	case 'RESET':
		state.tiles = [];
		for (let i = 0; i < action.boardSize; i++) {
			state.tiles.push(undefined);
		}
		return state.tiles;
	default:
		return state;
	}
};
