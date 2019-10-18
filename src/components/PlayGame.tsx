import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  PlayProps,
  PlayState,
  GameWon,
  Move,
  TicTacToeState,
} from "../interfaces/components.i";
import ActionTypes, {
  ResetAction,
  ChangePlayerAction,
  UpdateCurrentTurnAction,
  PlayerOneScoreAction,
  PlayerTwoScoreAction,
  ResetScoreAction,
  SetCurrentPlayerAction,
  ResetBoardAction,
  AddMoveAction,
  PlayDispatchProps,
} from "../interfaces/actions.i";
import * as playerActions from "../actions/player.action";
import * as boardActions from "../actions/board.action";
import Tile from "./Tile";
import ScoreBoard from "./ScoreBoard";
import { tilesData, winCombos } from "../data/tiles.data";

/*
  TODO
  [ ] Investigate why sometimes not all animations trigger
  [ ] Change addMove to be changing the array in state rather than  always sending a new one
 */

class PlayGame extends React.Component<PlayProps, PlayState> {
  public readonly state: PlayState = {
    disableClicks: false,
    gameFinished: false,
  };

  private currentTurnRef = React.createRef<HTMLDivElement>();

  private player1ScoreRef = React.createRef<HTMLDivElement>();

  private player2ScoreRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    setTimeout((): void => {
      const p1score = this.player1ScoreRef.current;
      p1score.style.visibility = "visible";
      p1score.className = "animated fadeIn";
      const p2score = this.player2ScoreRef.current;
      p2score.style.visibility = "visible";
      p2score.className = "animated fadeIn";
    }, 1000);
  }

  public componentWillUpdate(nextProps, nextState): void {
    this.currentTurnRef.current.className = "";
    if (nextState.gameFinished) {
      nextState.gameFinished = false;
      setTimeout((): void => {
        const { player, updateCurrentTurn } = this.props;
        const { player1, player2, noPlayers, currentPlayer } = player;

        if (currentPlayer === 1) {
          updateCurrentTurn(`It's ${player1.name}'s turn.`);
        } else {
          noPlayers === 1
            ? updateCurrentTurn("AI is thinking...")
            : updateCurrentTurn(`It's ${player2.name}'s turn.`);
        }
        this.onResetBoard();
      }, 1500);
    }
  }

  public componentDidUpdate(): void {
    const currentTurn = this.currentTurnRef.current;
    currentTurn.classList.add("animated", "fadeIn");
    setTimeout((): void => {
      currentTurn.className = "";
    }, 300);
  }

  private takeAITurn = (): void => {
    const { player } = this.props;
    const { player2 } = player;
    this.takeTurn(this.bestSpot(), player2.counter);
    this.setState({ disableClicks: false });
  };

  private takeTurn = (squareId: string, playerCounter: string): boolean => {
    const { player, addMove, board, updateCurrentTurn, changePlayer } = this.props;
    const { currentPlayer, player1, player2, noPlayers } = player;
    const { tiles } = board;

    const newBoard = tiles;
    newBoard[squareId] = playerCounter;
    addMove(newBoard);

    const tile = document.getElementById(squareId);
    tile.innerText = playerCounter;
    tile.className =
      currentPlayer === 1
        ? "tile__text--p1 animated fadeIn"
        : "tile__text--p2 animated fadeIn";

    const gameOver = this.checkResult(playerCounter);
    if (!gameOver) {
      if (currentPlayer === 1) {
        noPlayers === 1
          ? updateCurrentTurn("AI is thinking...")
          : updateCurrentTurn(`It's ${player2.name}'s turn`);
      } else {
        updateCurrentTurn(`It's ${player1.name}'s turn`);
      }
      changePlayer();
      return true;
    }
    return false;
  };

  public checkResult = (counter, minMax?: boolean): GameWon | boolean => {
    const { updateCurrentTurn, changePlayer } = this.props;
    const { board } = this.props;
    const { tiles } = board;

    const plays = tiles.reduce(
      (play, currentCounter, index): number[] =>
        currentCounter === counter ? play.concat(index) : play,
      [],
    );
    let gameWon = null;
    for (const [index, win] of winCombos.entries()) {
      if (win.every((elem: number): boolean => plays.indexOf(elem) > -1)) {
        gameWon = {
          index,
          player: counter,
        };
        break;
      }
    }

    if (gameWon && !minMax) {
      this.gameOver(gameWon);
      return true;
    }

    if (!minMax && this.emptyTiles().length === 0) {
      changePlayer();
      updateCurrentTurn("It's a draw!");
      setTimeout((): void => {
        this.setState({
          disableClicks: true,
          gameFinished: true,
        });
      }, 1000);
      return true;
    }

    return gameWon;
  };

  private gameOver = (gameWon: GameWon): void => {
    const {
      player: { player1 },
      playerOneScore,
      playerTwoScore,
    } = this.props;

    for (const index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
        gameWon.player === player1.counter ? "green" : "red";
      document.getElementById(index).className = "tile__text animated tada";
    }

    gameWon.player === player1.counter
      ? this.player1ScoreRef.current.classList.add("scores__animation--p1")
      : this.player2ScoreRef.current.classList.add("scores__animation--p2");

    gameWon.player === player1.counter ? playerOneScore() : playerTwoScore();

    this.setState({
      disableClicks: true,
      gameFinished: true,
    });

    this.currentTurnRef.current.className = "";
  };

  private emptyTiles = (): number[] => {
    /**
     * Return all of the tiles which are empty (typeof number)
     */
    const {
      board: { tiles },
    } = this.props;
    return tiles.filter((tile: number): boolean => typeof tile === "number");
  };

  private bestSpot = (): string => {
    const {
      player: { difficulty, player2 },
    } = this.props;
    const { length } = this.emptyTiles();
    const randomNum = Math.floor(Math.random() * Math.floor(length));

    /**
     * Get a randomly generated number 0/1. If it's 1 then the AI
     * will take the best possible position, if it's a 0 then it will
     * take a random position.
     */
    const miniMax = Math.floor(Math.random() * Math.floor(2)) === 1;

    switch (difficulty) {
      case 1:
        return length === 1
          ? this.emptyTiles()[0].toString()
          : this.emptyTiles()[randomNum].toString();
      /**
       * Easy difficulty -> Pick a random spot to place a counter
       */
      case 2:
        return miniMax
          ? this.minimax(player2.counter).index.toString()
          : length === 1
          ? this.emptyTiles()[0].toString()
          : this.emptyTiles()[randomNum].toString();
      /**
       * Normal difficulty -> There is a 50/50 chance that the AI will
       * choose the best possible move, or choose a random spot to place
       * a counter in.
       */
      case 3:
        return this.minimax(player2.counter).index.toString();
      /**
       * Unbeatable difficulty -> The AI will always choose the best option
       * to place a counter. The AI cannot be beaten.
       */
      default:
        return null;
    }
  };

  private onResetBoard = (): void => {
    const {
      player: { noPlayers, currentPlayer },
      resetBoard,
    } = this.props;

    for (let i = 0; i < 9; i++) {
      const index = i.toString();
      document.getElementById(index).style.background = "none";
      document.getElementById(index).innerText = "";
    }

    resetBoard();

    if (noPlayers === 1 && currentPlayer === 2) {
      setTimeout((): void => {
        this.takeAITurn();
      }, 1000);
    } else {
      this.setState({ disableClicks: false });
    }

    this.player1ScoreRef.current.className = "";
    this.player2ScoreRef.current.className = "";
  };

  private minimax = (counter): Move => {
    const {
      player: { player1, player2 },
      board: { tiles },
    } = this.props;
    const availSpots = this.emptyTiles();

    if (this.checkResult(player1.counter, true)) {
      return {
        score: -10,
      };
    }
    if (this.checkResult(player2.counter, true)) {
      return {
        score: 10,
      };
    }
    if (availSpots.length === 0) {
      return {
        score: 0,
      };
    }

    const moves: Move[] = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move: Move = {};
      move.index = tiles[availSpots[i]];
      tiles[availSpots[i]] = counter;
      if (counter === player2.counter) {
        const result = this.minimax(player1.counter);
        move.score = result.score;
      } else {
        const result = this.minimax(player2.counter);
        move.score = result.score;
      }

      tiles[availSpots[i]] = move.index;

      moves.push(move);
    }
    let bestMove;
    if (counter === player2.counter) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  };

  public render(): JSX.Element {
    const {
      player: { currentTurn },
    } = this.props;
    const { disableClicks } = this.state;

    return (
      <div className="play__container">
        <ScoreBoard
          player1ScoreRef={this.player1ScoreRef}
          player2ScoreRef={this.player2ScoreRef}
          enableTiles={(): void => this.setState({ disableClicks: false })}
        />
        <div id="current-turn" ref={this.currentTurnRef}>
          {currentTurn}
        </div>
        <div className="play__grid">
          {tilesData.map(
            (tile): JSX.Element => (
              <Tile
                takeTurn={this.takeTurn}
                key={tile}
                id={tile}
                currentTurn={this.currentTurnRef}
                takeAITurn={this.takeAITurn}
                disableClicks={disableClicks}
                disableTileClicks={(): void => this.setState({ disableClicks: true })}
              />
            ),
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): PlayDispatchProps => ({
  reset: (): ResetAction => dispatch(playerActions.reset()),
  changePlayer: (): ChangePlayerAction => dispatch(playerActions.changePlayer()),
  updateCurrentTurn: (turn: string): UpdateCurrentTurnAction =>
    dispatch(playerActions.updateCurrentTurn(turn)),
  playerOneScore: (): PlayerOneScoreAction => dispatch(playerActions.playerOneScore()),
  playerTwoScore: (): PlayerTwoScoreAction => dispatch(playerActions.playerTwoScore()),
  resetScore: (): ResetScoreAction => dispatch(playerActions.resetScore()),
  setCurrentPlayer: (player: number): SetCurrentPlayerAction =>
    dispatch(playerActions.setCurrentPlayer(player)),
  resetBoard: (): ResetBoardAction => dispatch(boardActions.resetBoard()),
  addMove: (board): AddMoveAction => dispatch(boardActions.addMove(board)),
});

const mapStateToProps = ({ player, board }): TicTacToeState => ({
  player,
  board,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayGame);
