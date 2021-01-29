import React from "react";
import { Player } from "../../types";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";

import "./GameDisplayHeader.css";

type GameDisplayHeaderProps = {
  players: Player[];
  id: string;
  isHost: boolean;
  startGame: () => void;
};

export default function GameDisplayHeader({
  players,
  id,
  isHost,
}: GameDisplayHeaderProps) {
  const opponentList = players.map((player, i) => (
    <PlayerAvatar player={player} key={`opponent-${i}`} />
  ));

  const startButton = isHost ? (
    <button className="main">Start game</button>
  ) : null;

  const gameIdDisplay = <h3>Game id: {id}</h3>;

  return (
    <div className="GameDisplayHeader">
      <div id="oponents">{opponentList}</div>
      {startButton}
      {gameIdDisplay}
    </div>
  );
}
