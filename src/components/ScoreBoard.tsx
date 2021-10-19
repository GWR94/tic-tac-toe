import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScoreBoardProps, PlayerState } from "../interfaces/components.i";
import { AppState } from "../store/store";
import * as boardActions from "../actions/board.action";
import * as playerActions from "../actions/player.action";
import { Tooltip } from "@mui/material";

const ScoreBoard: React.SFC<ScoreBoardProps> = ({
  player1ScoreRef,
  player2ScoreRef,
  enableTiles,
}): JSX.Element => {
  const { player1, player2 } = useSelector(
    ({ player }: AppState): PlayerState => player
  );

  const dispatch = useDispatch();

  const onResetClick = (): void => {
    /**
     * Reset the score and the board when the user clicks the back arrow to
     * signify they want to reset.
     */
    setTimeout((): void => {
      enableTiles();
      dispatch(boardActions.resetBoard());
      dispatch(playerActions.resetScore());

      for (let i = 0; i < 9; i++) {
        const index = i.toString();
        document.getElementById(index).style.background = "none";
        document.getElementById(index).innerText = "";
      }
    }, 200);
  };

  return (
    <div className="scores__container">
      <div className="scores__player--container animate__animated animate__slideInLeft">
        {player1.name || "Player 1"}:{" "}
        <div id="p1score" ref={player1ScoreRef}>
          {player1.score}
        </div>
      </div>
      <Tooltip arrow placement="top" title="Reset Game">
        <i
          className="fas fa-arrow-left play__back-button animate__animated animate__fadeIn animate__delay-2s"
          role="button"
          tabIndex={0}
          onClick={() => dispatch(playerActions.reset())}
        />
      </Tooltip>
      <Tooltip arrow placement="top" title="Restart Current Game">
        <i
          className="fa fa-undo play__reset-button animate__animated animate__fadeIn animate__delay-2s"
          role="button"
          tabIndex={0}
          onClick={onResetClick}
        />
      </Tooltip>
      <div className="scores__player--container animate__animated animate__slideInRight">
        {player2.name}:{" "}
        <div id="p2score" ref={player2ScoreRef}>
          {player2.score}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
