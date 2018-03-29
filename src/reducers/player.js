const defaultPlayerState = {
	player1: 'X',
	player2: 'O',
	currentPlayer: 1,
	noPlayers: 0,
};

export default (state = defaultPlayerState, action) => {
	switch (action.type) {
	case 'CHANGE_PLAYER_AFTER_MOVE':
		return {
			...state,
			player1: state.player1 === 'X' ? 'O' : 'X',
			player2: state.player2 === 'X' ? 'O' : 'X',
			currentPlayer: state.currentPlayer === 1 ? 2 : 1,
		};
	case 'RESET':
		return {
			...state,
			player1: 'X',
			player2: 'O',
		};
	case 'SET_PLAYERS':
		return ({
			...state,
			noPlayers: action.noPlayers
		});
	default:
		return state;
	}
};