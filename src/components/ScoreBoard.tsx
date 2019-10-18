import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScoreBoardProps, PlayerState } from "../interfaces/components.i";
import { AppState } from "../store/store";
import {
  ResetScoreAction,
  RESET_SCORE,
  ResetBoardAction,
  RESET_BOARD,
} from "../interfaces/actions.i";

const ScoreBoard: React.SFC<ScoreBoardProps> = ({
  player1ScoreRef,
  player2ScoreRef,
  enableTiles,
}): JSX.Element => {
  const { player1, player2 } = useSelector(({ player }: AppState): PlayerState => player);

  const dispatch = useDispatch();
  const resetScore = (): ResetScoreAction => dispatch({ type: RESET_SCORE });
  const resetBoard = (): ResetBoardAction => dispatch({ type: RESET_BOARD });

  const onResetClick = (): void => {
    /**
     * Reset the score and the board when the user clicks the back arrow to
     * signify they want to reset.
     */
    setTimeout((): void => {
      enableTiles();
      resetScore();
      resetBoard();

      for (let i = 0; i < 9; i++) {
        const index = i.toString();
        document.getElementById(index).style.background = "none";
        document.getElementById(index).innerText = "";
      }
    }, 200);
  };

  return (
    <div className="scores__container">
      <div className="scores__player--container animated slideInLeft">
        {player1.name || "Player 1"}:{" "}
        <div id="p1score" ref={player1ScoreRef}>
          {player1.score}
        </div>
      </div>
      <i
        className="fa fa-undo play__back-button"
        role="button"
        tabIndex={0}
        onClick={onResetClick}
      />
      <div className="scores__player--container animated slideInRight">
        {player2.name}:{" "}
        <div id="p2score" ref={player2ScoreRef}>
          {player2.score}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
