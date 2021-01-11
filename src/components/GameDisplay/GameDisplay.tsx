import React from "react";
import { BlackCardDisplay } from "../CardDisplay/CardDisplay";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import PlayerHand from "../PlayerHand/PlayerHand";
import useGameServer from "../../core/GameServer";

import "./GameDisplay.css";

type GameScreenProps = {
  id: string;
  playerName: string;
};

export default function GameDisplay({ id, playerName }: GameScreenProps) {
  const [, gameState] = useGameServer(id, playerName);

  if (gameState.loading) {
    return (
      <div className="GameScreen GameDisplay-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const oponents = gameState.players.map((player, i) => (
    <PlayerAvatar player={player} key={`oponent-${i}`} />
  ));

  const blackCard =
    gameState.currentRound === null ? (
      <h2>Waiting for game to start...</h2>
    ) : (
      <BlackCardDisplay card={gameState.currentRound.blackCard} />
    );

  return (
    <div className="GameDisplay">
      <div id="oponents">{oponents}</div>
      <div id="table">{blackCard}</div>
      <PlayerHand hand={gameState.userHand} />
    </div>
  );
}
