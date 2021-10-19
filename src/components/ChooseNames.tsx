import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";
import { Player } from "../interfaces/components.i";
import { AppState } from "../store/store";
import {
  ResetAction,
  RESET,
  SetupPlayersAction,
  SETUP_PLAYERS,
} from "../interfaces/actions.i";
import styles from "../styles/names.style";

const ChooseNames: React.FC = (): JSX.Element => {
  const [player1, setPlayer1] = useState<Player>({ name: "", counter: "X" });
  const [player2, setPlayer2] = useState<Player>({ name: "", counter: "O" });
  const [difficulty, setDifficulty] = useState(2);

  const noPlayers = useSelector(
    ({ player }: AppState): number => player.noPlayers
  );

  const dispatch = useDispatch();

  const reset = (): ResetAction => dispatch({ type: RESET });

  const useStyles = styles;
  const classes = useStyles();

  const setupPlayers = (
    player1: Player,
    player2: Player,
    difficulty: number
  ): SetupPlayersAction =>
    dispatch({ type: SETUP_PLAYERS, player1, player2, difficulty });

  useEffect((): void => {
    if (noPlayers === 1) {
      setPlayer2({ ...player2, name: "Normal AI" });
    }
  }, [noPlayers, player2]);

  const onPlayerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: number
  ): void => {
    const name = e.target.value;
    player === 1
      ? setPlayer1({ ...player1, name })
      : setPlayer2({ ...player2, name });
  };

  const onChangeCounter = (): void => {
    setPlayer1({
      ...player1,
      counter: player1.counter === "X" ? "O" : "X",
    });
    setPlayer2({
      ...player2,
      counter: player2.counter === "X" ? "O" : "X",
    });
  };

  const onChangeDifficulty = (diff: number): void => {
    let name;
    switch (diff) {
      case 1:
        name = "Easy AI";
        break;
      case 2:
        name = "Normal AI";
        break;
      case 3:
        name = "Unbeatable AI";
        break;
      default:
        name = "Normal AI";
        break;
    }

    setDifficulty(diff);
    setPlayer2({
      ...player2,
      name,
    });
  };

  const onSubmit = (): void => {
    if (player1.name.length === 0) player1.name = "Player 1";
    if (player2.name.length === 0) player2.name = "Player 2";

    setupPlayers(player1, player2, difficulty);
  };

  return (
    <div className={`${classes.container} animate__animated animate__fadeIn`}>
      <i
        className={`fa fa-undo ${classes.backButton}`}
        onClick={reset}
        role="button"
        tabIndex={0}
      />
      <Typography className={classes.title}>
        {noPlayers === 1
          ? 'Please select a difficulty and click "Play Game" to begin.'
          : 'Click "Play Game" to begin.'}
      </Typography>
      <Typography className={classes.subtitle}>
        You can input your {noPlayers === 1 ? "name" : "names"} and change your
        counter by clicking on the &quot;X&quot; or &quot;O&quot; below.
      </Typography>
      <TextField
        value={player1.name}
        className={classes.input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          onPlayerNameChange(e, 1)
        }
        label="Player 1"
        variant="outlined"
        fullWidth
      />

      {noPlayers === 2 && (
        <TextField
          value={player2.name}
          className={classes.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            onPlayerNameChange(e, 2)
          }
          label="Player 2"
          variant="outlined"
          fullWidth
          style={{ margin: "20px 0" }}
        />
      )}

      {noPlayers === 1 && (
        <div>
          <Typography className={classes.title}>
            What difficulty would you like to play against?
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.easyButton}
              variant={difficulty === 1 ? "outlined" : "text"}
              color="inherit"
              onClick={(): void => onChangeDifficulty(1)}
            >
              Easy
            </Button>
            <Button
              className={classes.normalButton}
              variant={difficulty === 2 ? "outlined" : "text"}
              color="inherit"
              onClick={(): void => onChangeDifficulty(2)}
            >
              Normal
            </Button>
            <Button
              className={classes.hardButton}
              variant={difficulty === 3 ? "outlined" : "text"}
              color="inherit"
              onClick={(): void => onChangeDifficulty(3)}
            >
              Unbeatable
            </Button>
          </div>
        </div>
      )}
      <div className={classes.countersContainer}>
        <div className={classes.playerContainer} role="button" tabIndex={0}>
          <Typography className={classes.counterText}>
            {player1.name.length > 0 ? player1.name : "Player 1"}:{" "}
          </Typography>
          <span
            className={classes.counter}
            onClick={onChangeCounter}
            role="button"
            tabIndex={0}
            style={{ color: "#0f9128" }}
          >
            {player1.counter}
          </span>
        </div>
        <div className={classes.playerContainer}>
          <Typography className={classes.counterText}>
            {player2.name.length > 0 ? player2.name : "Player 2"}:{" "}
          </Typography>
          <span
            className={classes.counter}
            onClick={onChangeCounter}
            tabIndex={0}
            role="button"
            style={{ color: "#d6463c" }}
          >
            {player2.counter}
          </span>
        </div>
      </div>
      <Button color="primary" variant="contained" onClick={onSubmit}>
        Play Game!
      </Button>
    </div>
  );
};

export default ChooseNames;
