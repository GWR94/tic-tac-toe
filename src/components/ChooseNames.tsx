import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input } from "reactstrap";
import { Player } from "../interfaces/components.i";
import { AppState } from "../store/store";
import {
  ResetAction,
  RESET,
  SetupPlayersAction,
  SETUP_PLAYERS,
} from "../interfaces/actions.i";

const ChooseNames: React.SFC = (): JSX.Element => {
  const [player1, setPlayer1] = useState({ name: "", counter: "X" });
  const [player2, setPlayer2] = useState({ name: "", counter: "O" });
  const [difficulty, setDifficulty] = useState(2);
  const noPlayers = useSelector(({ player }: AppState): number => player.noPlayers);
  const dispatch = useDispatch();

  const reset = (): ResetAction => dispatch({ type: RESET });
  const setupPlayers = (
    player1: Player,
    player2: Player,
    difficulty: number,
  ): SetupPlayersAction =>
    dispatch({ type: SETUP_PLAYERS, player1, player2, difficulty });

  useEffect((): void => {
    if (noPlayers === 1) {
      setPlayer2({ ...player2, name: "Normal AI" });
    }
  });

  const onPlayerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    player: number,
  ): void => {
    const name = e.target.value;
    player === 1 ? setPlayer1({ ...player1, name }) : setPlayer2({ ...player2, name });
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
    <div className="names__container animated fadeIn">
      <i
        className="fa fa-undo names__back-button"
        onClick={reset}
        role="button"
        tabIndex={0}
        onKeyDown={(e): void => {
          if (e.key === "Escape") {
            reset();
          }
        }}
      />
      <div className="names__player-text-container">
        <h2 className="names__player-text">
          {noPlayers === 1
            ? 'Please select a difficulty and click "Play Game" to begin, and change your name if you wish to.'
            : 'Click "Play Game" to begin, or change your names and counters if you wish to.'}
        </h2>
      </div>
      <div className="names__setup-names--container">
        <div className="names__player-container">
          <p className="names__player-label-text">Player 1:</p>
          <Input
            className="names__player-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              onPlayerNameChange(e, 1)
            }
            value={player1.name}
          />
        </div>

        {noPlayers === 2 && (
          <div className="names__player-container">
            <p className="names__player-label-text">Player 2:</p>
            <Input
              className="names__player-input"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                onPlayerNameChange(e, 2)
              }
              value={player2.name}
            />
          </div>
        )}
      </div>

      {noPlayers === 1 && (
        <div>
          <h3 className="names__choose-difficulty">
            What difficulty would you like to play against?
          </h3>
          <div className="names__button-container">
            <Button
              active={difficulty === 1}
              className="names__difficulty-button"
              color="success"
              onClick={(): void => onChangeDifficulty(1)}
              outline
              size="lg"
            >
              Easy
            </Button>
            <Button
              active={difficulty === 2}
              className="names__difficulty-button"
              color="warning"
              onClick={(): void => onChangeDifficulty(2)}
              outline
              size="lg"
            >
              Normal
            </Button>
            <Button
              active={difficulty === 3}
              className="names__difficulty-button"
              color="danger"
              onClick={(): void => onChangeDifficulty(3)}
              outline
              size="lg"
            >
              Unbeatable
            </Button>
          </div>
        </div>
      )}
      <div className="names__counter-container--player">
        <div
          onClick={onChangeCounter}
          role="button"
          tabIndex={0}
          className="names__counter-container"
        >
          <p>{player1.name.length > 0 ? player1.name : "Player 1"}:</p>
          <div className="names__counter--player1">{player1.counter}</div>
        </div>
        <div
          className="names__counter-container"
          onClick={onChangeCounter}
          role="button"
          tabIndex={0}
        >
          <p>{player2.name.length > 0 ? player2.name : "Player 2"}:</p>
          <div className="names__counter--player2">{player2.counter}</div>
        </div>
      </div>
      <div className="names__button-container">
        <Button
          className="names__play-button"
          size="lg"
          color="primary"
          onClick={onSubmit}
        >
          Play Game!
        </Button>
      </div>
    </div>
  );
};

export default ChooseNames;
