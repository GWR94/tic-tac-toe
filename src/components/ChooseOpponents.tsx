import React from "react";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { SetNumPlayersAction } from "../interfaces/actions.i";
import * as actions from "../actions/player.action";

const ChooseOpponents: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div className="opponents__container animate__animated animate__fadeIn">
      <Typography className="opponents__title" gutterBottom>
        Welcome to Tic-Tac-Toe!
      </Typography>
      <Typography className="opponents__subtitle" gutterBottom>
        Would you like to try your luck against the computer,
        <br />
        play locally against a friend, or challenge someone online?
      </Typography>
      <Typography className="opponents__subtitle-two" gutterBottom>
        There are 3 different difficulties to choose <br />
        when playing a one player game!
      </Typography>
      <div className="opponents__button-container">
        <Button
          className="opponents__button"
          color="primary"
          onClick={(): SetNumPlayersAction =>
            dispatch(actions.setNumPlayers(1))
          }
          variant="outlined"
          style={{ margin: "0 3px" }}
        >
          1 Player
        </Button>
        <Button
          className="opponents__button"
          color="secondary"
          variant="outlined"
          onClick={(): SetNumPlayersAction =>
            dispatch(actions.setNumPlayers(2))
          }
          style={{ margin: "0 3px" }}
        >
          2 Player
        </Button>
        <Button
          className="opponents__button"
          color="success"
          variant="outlined"
          onClick={(): SetNumPlayersAction =>
            dispatch(actions.setNumPlayers(3))
          }
          style={{ margin: "0 3px" }}
        >
          Online 1v1
        </Button>
      </div>
    </div>
  );
};

export default ChooseOpponents;
