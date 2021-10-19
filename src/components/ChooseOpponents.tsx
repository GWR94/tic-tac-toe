import React from "react";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import { SetNumPlayersAction } from "../interfaces/actions.i";
import styles from "../styles/opponents.style";
import * as actions from "../actions/player.action";

const ChooseOpponents: React.FC = (): JSX.Element => {
  const useStyles = styles;
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={`${classes.container} animate__animated animate__fadeIn`}>
      <Typography className={classes.title} gutterBottom>
        Welcome to Tic-Tac-Toe!
      </Typography>
      <Typography className={classes.subtitle} gutterBottom>
        Would you like to try your luck against the computer,
        <br />
        or play against a friend?
      </Typography>
      <Typography className={classes.subtitleTwo} gutterBottom>
        There are 3 different difficulties to choose <br />
        when playing a one player game!
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
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
          className={classes.button}
          color="secondary"
          variant="outlined"
          onClick={(): SetNumPlayersAction =>
            dispatch(actions.setNumPlayers(2))
          }
          style={{ margin: "0 3px" }}
        >
          2 Player
        </Button>
      </div>
    </div>
  );
};

export default ChooseOpponents;
