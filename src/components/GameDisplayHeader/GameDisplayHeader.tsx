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

/**
 * This is the header section of the game screen. Here the players and other info is shown
 *
 * @param players - the list of players that are in the game
 * @param id - the id of the current game
 * @param showStartGame - flag to show / hide the start game button
 * @param showNextRound - flag to show / hide the next round button
 * @param startGame - Handler for when the startGame or nextRound button is pressed
 * @param judgeName - the name of the judge in the current round
 */
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
