import React from "react";
import { useSelector } from "react-redux";
import PlayGame from "./PlayGame";
import ChooseNames from "./ChooseNames";
import ChooseOpponents from "./ChooseOpponents";
import { PlayerState } from "../interfaces/components.i";
import background from "../images/background.jpg";
import { AppState } from "../store/store";

const Setup: React.FC = (): JSX.Element => {
  const { noPlayers, readyToPlay } = useSelector(
    ({ player }: AppState): PlayerState => player
  );

  return (
    <div
      className="tic-tac-toe__container"
      style={{
        background: `url(${background}) no-repeat fixed center`,
        backgroundSize: "cover",
      }}
    >
      {!readyToPlay ? (
        noPlayers === undefined ? (
          <ChooseOpponents />
        ) : (
          <ChooseNames />
        )
      ) : (
        <PlayGame />
      )}
    </div>
  );
};

export default Setup;
