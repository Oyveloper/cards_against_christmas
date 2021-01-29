import React, { useEffect, useState } from "react";
import { BlackCardDisplay } from "../CardDisplay/CardDisplay";
import PlayerHand from "../PlayerHand/PlayerHand";
import useGameServer from "../../core/GameServer";

import "./GameDisplay.css";
import GameDisplayHeader from "../GameDisplayHeader/GameDisplayHeader";

type GameScreenProps = {
  id: string;
  playerName: string;
};

export default function GameDisplay({ id, playerName }: GameScreenProps) {
  const [, gameState] = useGameServer(id, playerName);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (gameState.players.length > 0) {
      setIsHost(
        gameState.players.filter((p) => p.name === playerName)[0].isHost
      );
    }
  }, [gameState, playerName]);

  if (gameState.loading) {
    return (
      <div className="GameScreen GameDisplay-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const blackCard =
    gameState.currentRound === null ? (
      <h2>Waiting for game to start...</h2>
    ) : (
      <BlackCardDisplay card={gameState.currentRound.blackCard} />
    );

  const startGame = () => {
    console.log("Start game");
  };

  return (
    <div className="GameDisplay">
      <GameDisplayHeader
        players={gameState.players}
        id={id}
        isHost={isHost}
        startGame={startGame}
      />
      <div id="table">{blackCard}</div>
      <PlayerHand hand={gameState.userHand} />
    </div>
  );
}
