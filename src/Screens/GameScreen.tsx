import React from "react";
import { BlackCardDisplay } from "../components/CardDisplay/CardDisplay";
import PlayerAvatar from "../components/PlayerAvatar/PlayerAvatar";
import PlayerHand from "../components/PlayerHand/PlayerHand";
import useGameServer from "../core/GameServer";

import "./GameScreen.css";

type GameScreenProps = {
  id: string;
  playerName: string;
};

export default function GameScreen({ id, playerName }: GameScreenProps) {
  const [gameServer, gameState] = useGameServer(id);

  if (gameState.loading) {
    return (
      <div className="GameScreen GameScreen-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const oponents = gameState.players.map((player, i) => (
    <PlayerAvatar player={player} key={`oponent-${i}`} />
  ));

  const blackCard =
    gameState.currentRound === undefined ? null : (
      <BlackCardDisplay card={gameState.currentRound.blackCard} />
    );

  return (
    <div className="GameScreen">
      <div id="oponents">
        {oponents}
        <button onClick={() => gameServer.drawCard()}>Draw</button>
      </div>
      <div id="table">{blackCard}</div>
      <PlayerHand hand={gameState.userHand} />
    </div>
  );
}
