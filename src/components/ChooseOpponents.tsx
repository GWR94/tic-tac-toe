import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { SetNumPlayersAction, SET_NUM_PLAYERS } from "../interfaces/actions.i";

const ChooseOpponents: React.SFC = (): JSX.Element => {
  const dispatch = useDispatch();
  const setNumPlayers = (numPlayers: number): SetNumPlayersAction =>
    dispatch({ type: SET_NUM_PLAYERS, numPlayers });

  return (
    <div className="opponents__container animated fadeIn">
      <h1 className="opponents__title">Welcome to Tic-Tac-Toe!</h1>
      <h3 className="opponents__subtitle">
        Would you like to try your luck against the computer,
        <br />
        or play against a friend?
      </h3>
      <h3 className="opponents__subtitle-two">
        There are 3 different difficulties to choose <br />
        when playing a one player game!
      </h3>
      <div className="opponents__button-container">
        <Button
          className="opponents__button"
          outline
          color="secondary"
          size="lg"
          onClick={(): SetNumPlayersAction => setNumPlayers(1)}
        >
          1 Player
        </Button>
        <Button
          className="opponents__button"
          outline
          color="secondary"
          size="lg"
          onClick={(): SetNumPlayersAction => setNumPlayers(2)}
        >
          2 Player
        </Button>
      </div>
    </div>
  );
};

export default ChooseOpponents;
