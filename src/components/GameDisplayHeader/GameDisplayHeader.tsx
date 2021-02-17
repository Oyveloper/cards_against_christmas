import React from "react";
import { Player } from "../../types";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";

import "./GameDisplayHeader.css";

type GameDisplayHeaderProps = {
  players: Player[];
  id: string;
  showStartGame: boolean;
  showNextRound: boolean;
  startGame: () => void;
  judgeName: string;
};

export default function GameDisplayHeader({
  players,
  id,
  showStartGame,
  showNextRound,
  startGame,
  judgeName,
}: GameDisplayHeaderProps) {
  const opponentList = players.map((player, i) => (
    <PlayerAvatar
      player={player}
      isJudge={player.name === judgeName}
      key={`opponent-${i}`}
    />
  ));

  const startButton = showStartGame ? (
    <button className="main" onClick={startGame}>
      Start game
    </button>
  ) : null;

  const nextRoundButton = showNextRound ? (
    <button className="main" onClick={startGame}>
      New round
    </button>
  ) : null;

  const gameIdDisplay = <h3>Game id: {id}</h3>;

  return (
    <div className="GameDisplayHeader">
      <div id="oponents">{opponentList}</div>
      {startButton}
      {nextRoundButton}
      {gameIdDisplay}
    </div>
  );
}
