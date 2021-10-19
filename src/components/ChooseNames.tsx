import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  createTheme,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Player } from "../interfaces/components.i";
import { AppState } from "../store/store";
import * as actions from "../actions/player.action";
import styles from "../styles/names.style";
import { ResetGameAction } from "../interfaces/actions.i";

const ChooseNames: React.FC = (): JSX.Element => {
  const [player1, setPlayer1] = useState<Player>({ name: "", counter: "X" });
  const [player2, setPlayer2] = useState<Player>({ name: "", counter: "O" });
  const [difficulty, setDifficulty] = useState(2);

  const noPlayers = useSelector(
    ({ player }: AppState): number => player.noPlayers
  );

  const dispatch = useDispatch();

  const theme = createTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  const useStyles = styles;
  const classes = useStyles();

  useEffect((): void => {
    if (noPlayers === 1) {
      setPlayer2({ ...player2, name: "Normal AI" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    dispatch(actions.setupPlayers(player1, player2, difficulty));
  };

  return (
    <div className={`${classes.container} animate__animated animate__fadeIn`}>
      <i
        className={`fa fa-undo ${classes.backButton}`}
        onClick={(): ResetGameAction => dispatch(actions.reset())}
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
        counter by clicking on the X or O below.
      </Typography>
      <TextField
        value={player1.name}
        className={classes.input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          onPlayerNameChange(e, 1)
        }
        size={desktop ? "medium" : "small"}
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
          <Typography className={classes.subtitle} style={{ marginTop: 12 }}>
            What difficulty would you like to play against?
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.easyButton}
              variant={difficulty === 1 ? "outlined" : "text"}
              color="inherit"
              onClick={(): void => onChangeDifficulty(1)}
              size={desktop ? "medium" : "small"}
            >
              Easy
            </Button>
            <Button
              className={classes.normalButton}
              variant={difficulty === 2 ? "outlined" : "text"}
              color="inherit"
              onClick={(): void => onChangeDifficulty(2)}
              size={desktop ? "medium" : "small"}
            >
              Normal
            </Button>
            <Button
              className={classes.hardButton}
              variant={difficulty === 3 ? "outlined" : "text"}
              color="inherit"
              onClick={(): void => onChangeDifficulty(3)}
              size={desktop ? "medium" : "small"}
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
