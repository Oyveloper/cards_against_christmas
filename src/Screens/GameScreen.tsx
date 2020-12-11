import React from "react";
import CardDisplay from "../components/CardDisplay";
import Game from "../core/Game";

import "./GameScreen.css";

type GameScreenProps = {
  game: Game;
};

export default function GameScreen({ game }: GameScreenProps) {
  const playerHand = game.userHand.map((card, i) => (
    <CardDisplay card={card} key={`hand-card-${i}`} />
  ));

  console.log(game.players);

  return (
    <div className="GameScreen">
      <div id="oponents"></div>
      <div id="table"></div>
      <div id="player-hand">
        <div id="player-hand-card-container">{playerHand}</div>
      </div>
    </div>
  );
}
