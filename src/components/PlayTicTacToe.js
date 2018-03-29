import React from 'react';
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

export class TicTacToe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			noPlayers: this.props ? this.props.noPlayers : 1,
			player1Counter: this.props ? this.props.player1Counter : 'X',
			player2Counter: this.props ? this.props.player2Counter : 'O',
			aiCounter: this.props.player1Counter === 'X' ? 'O' : 'X',
			currentPlayer: 1,
			origBoard: Array.from(Array(9).keys()),
			difficulty: this.props ? this.props.difficulty : 1,
			player1Score: 0,
			player2Score: 0,
			aiScore: 0,
			winningOutcome: undefined,
			endGame: false,
			p1name: this.props.p1name,
			p2name: this.props.p2name,
			gameFinished: false,
			currentTurn: `It's ${this.props.p1name}'s turn`,
			
		};
	}

	onClick = e => {
		document.getElementById('currentTurn').className = '';
		const id = e.target.id;
		if (typeof this.state.origBoard[id] === 'number') {
			if (!this.checkTie() && this.state.noPlayers === 1) {
				this.turn(id, this.state.player1Counter);
				if (!this.checkTie() && !this.checkWin(this.state.origBoard, this.state.player1Counter)) {
					this.setState({ endGame: true, currentPlayer: 2 });
					setTimeout(() => {
						this.turn(this.bestSpot(), this.state.aiCounter);
						if (this.checkTie() || this.checkWin(this.state.origBoard, this.state.aiCounter)) {
							this.setState({ gameFinished: true });
						} else {
							this.setState({ endGame: false, currentPlayer: 1 });
						}
					}, 1000);
				}
			} else {
				if (this.state.currentPlayer === 1) {
					this.turn(id, this.state.player1Counter);
					this.setState({
						currentPlayer: 2,
					});
				} else if (this.state.currentPlayer === 2 && !this.checkTie()) {
					this.turn(id, this.state.player2Counter);
					this.setState({
						currentPlayer: 1,
					});
				}
			}
		}
	};

	turn = (squareId, playerCounter) => {
		const newBoard = this.state.origBoard;
		newBoard[squareId] = playerCounter;
		this.setState({
			origBoard: newBoard,
		});
		const tile = document.getElementById(squareId);
		tile.innerText = playerCounter;
		tile.className =
			this.state.currentPlayer === 1 ? 'tile-text-p1 animated fadeIn' : 'tile-text-p2 animated fadeIn';
		let gameWon = this.checkWin(this.state.origBoard, playerCounter);
		if (this.state.currentPlayer === 1 && this.state.noPlayers === 2) {
			this.setState({ currentTurn: `It's ${this.state.p2name}'s turn` });
		} else if (this.state.currentPlayer === 1 && this.state.noPlayers === 1) {
			this.setState({ currentTurn: 'AI is thinking...' });
		} else if (this.state.currentPlayer === 2) {
			this.setState({ currentTurn: `It's ${this.state.p1name}'s turn` }); 
		}
		if (gameWon) {
			this.gameOver(gameWon);
		}
	};

	checkWin = (board, player) => {
		let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
		let gameWon = null;
		for (let [index, win] of winCombos.entries()) {
			if (win.every(elem => plays.indexOf(elem) > -1)) {
				gameWon = {
					index: index,
					player: player,
				};
				break;
			}
		}
		return gameWon;
	};

	gameOver = gameWon => {
		for (let index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor =
				gameWon.player === this.state.player1Counter ? 'green' : 'red';
			document.getElementById(index).className = 'tile-text animated tada';
		}
		if (this.state.noPlayers === 1) {
			this.declareWinner(gameWon.player === this.state.player1Counter ? 'You Win!' : 'You Lose!');
			gameWon.player === this.state.player1Counter 
			? document.getElementById('p1score').classList = 'scoringAnimation'
			: document.getElementById('p2score').classList = 'scoringAnimation'; 
			
			gameWon.player === this.state.player1Counter
				? this.setState({
						currentTurn: `${this.state.p1name} Wins!`,
						player1Score: this.state.player1Score + 1,
						currentPlayer: 2,
					})
				: this.setState({
						currentTurn: 'The Computer Wins!',
						aiScore: this.state.aiScore + 1,
						currentPlayer: 1,
					});
		} else {
			this.declareWinner(gameWon.player === this.state.player1Counter ? `${this.state.p1name} Wins!` : `${this.state.p2name} Wins!`);
			gameWon.player === this.state.player1Counter
				? this.setState({
						currentTurn: `${this.state.p1name} Wins!`,
						player1Score: this.state.player1Score + 1,
					})
					
				: this.setState({
						currentTurn: `${this.state.p2name} Wins!`,
						player2Score: this.state.player2Score + 1,
					});
		}
		this.setState({ gameFinished: true });
	};

	onResetClick = () => {
		setTimeout(() => {
			this.setState({
				currentPlayer: 1,
				origBoard: Array.from(Array(9).keys()),
				player1Score: 0,
				player2Score: 0,
				aiScore: 0,
				winningOutcome: undefined,
				endGame: false,
			});
			for (var i = 0; i < 9; i++) {
				document.getElementById(i).style.background = 'none';
				document.getElementById(i).innerText = '';
			}
		}, 200);
	};

	declareWinner = result => {
		this.setState({
			endGame: true,
			gameFinished: true,
			winningOutcome: result,
		});
	};

	emptyTiles = () => {
		return this.state.origBoard.filter(s => typeof s == 'number');
	};

	bestSpot = () => {
		if (this.state.difficulty === 1) {
			return this.emptyTiles()[0];
		} else if (this.state.difficulty === 2) {
			var length = this.emptyTiles().length;
			if(length === 1) {
				return this.emptyTiles()[0];
			} else {
				let randomNum = Math.floor(Math.random() * Math.floor(length));
				return this.emptyTiles()[randomNum];
			}
		} else if (this.state.difficulty === 3) {
			return this.minimax(this.state.origBoard, this.state.aiCounter).index;
		}
	};

	onResetBoard = () => {
		setTimeout(() => {
			this.setState({
				origBoard: Array.from(Array(9).keys()),
				winningOutcome: undefined,
				endGame: false,
				gameFinished: false,
				currentTurn:
					(this.state.currentPlayer === 2 && this.state.noPlayers === 2 && `It's ${this.state.p2name}'s turn`) ||
					(this.state.currentPlayer === 2 && this.state.noPlayers === 1 && 'AI is thinking...') ||
					(this.state.currentPlayer === 1 && `It's ${this.state.p1name}'s turn`),
			});
			document.getElementById('p1score').className = '';
			document.getElementById('p2score').className = '';
			for (var i = 0; i < 9; i++) {
				document.getElementById(i).style.background = 'none';
				document.getElementById(i).innerText = '';
			}
			if (this.state.currentPlayer === 2 && this.state.noPlayers === 1) {
				this.setState({ endGame: true });
				setTimeout(() => {
					this.turn(this.bestSpot(), this.state.aiCounter);
					this.setState({ currentPlayer: 1, endGame: false });
				}, 1000);
			}
		}, 1500);
	};

	checkTie = () => {
		if (
			this.emptyTiles().length === 0 &&
			!this.checkWin(this.state.origBoard, 'X') &&
			!this.checkWin(this.state.origBoard, 'O')
		) {
			this.declareWinner('Tie Game!');
			this.setState({
				currentPlayer: this.state.currentPlayer === 1 ? 2 : 1,
				gameFinished: true,
				currentTurn: "It's a draw!"
			});
			return true;
		}
		return false;
	};

	minimax = (newBoard, player) => {
		var availSpots = this.emptyTiles(newBoard);

		if (this.checkWin(newBoard, this.state.player1Counter)) {
			return {
				score: -10,
			};
		} else if (this.checkWin(newBoard, this.state.aiCounter)) {
			return {
				score: 10,
			};
		} else if (availSpots.length === 0) {
			return {
				score: 0,
			};
		}
		var moves = [];
		for (var i = 0; i < availSpots.length; i++) {
			var move = {};
			move.index = newBoard[availSpots[i]];
			newBoard[availSpots[i]] = player;

			if (player == this.state.aiCounter) {
				let result = this.minimax(newBoard, this.state.player1Counter);
				move.score = result.score;
			} else {
				let result = this.minimax(newBoard, this.state.aiCounter);
				move.score = result.score;
			}

			newBoard[availSpots[i]] = move.index;

			moves.push(move);
		}

		var bestMove;
		if (player === this.state.aiCounter) {
			let bestScore = -10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			let bestScore = 10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
		return moves[bestMove];
	};

	componentDidMount() {
		setTimeout(() => {
			const p1score = document.getElementById('p1score');
			p1score.style.visibility = 'visible';
			p1score.className = 'animated fadeIn';
			const p2score = document.getElementById('p2score');
			p2score.style.visibility = 'visible';
			p2score.className = 'animated fadeIn';
		}, 1000);
	}

	componentWillUpdate(nextProps, nextState) {
		document.getElementById('currentTurn').className = '';
		if (nextState.gameFinished) {
			this.onResetBoard();
		}
	}

	componentDidUpdate() {
		document.getElementById('currentTurn').className = 'animated fadeIn';
		setTimeout(() => {
			document.getElementById('currentTurn').className = '';
		}, 300);
	}	

	render() {
		return (
			<div>
				<div className="scores">
					<div className="player1score">
						<div className="player1Label animated slideInLeft">{this.state.p1name}: </div>
						<div id="p1score">{this.state.player1Score > 0 ? this.state.player1Score : 0}</div>
					</div>
					<div className="player2score">
						<div className="player2Label animated slideInRight">
							{this.state.noPlayers === 2
								? this.state.p2name
								: `${(this.state.difficulty === 1 && 'Easy') ||
										(this.state.difficulty === 2 && 'Normal') ||
										(this.state.difficulty === 3 && 'Unbeatable')} AI`}:
						</div>
						<div id="p2score">
							{this.state.noPlayers === 2
								? this.state.player2Score > 0 ? this.state.player2Score : 0
								: this.state.aiScore > 0 ? this.state.aiScore : 0}
						</div>
					</div>
				</div>
				<div id="currentTurn">{this.state.currentTurn}</div>
				<div id="backBtnContainer" onClick={this.props.restart}><i className="fa fa-undo" /></div>
				<div className="grid">
					<div className="tile">
						<div className="tile-text" id={0} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={1} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={2} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={3} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={4} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={5} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={6} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={7} onClick={!this.state.endGame && this.onClick} />
					</div>
					<div className="tile">
						<div className="tile-text" id={8} onClick={!this.state.endGame && this.onClick} />
					</div>
				</div>
			</div>
		);
	}
}

export default TicTacToe;
