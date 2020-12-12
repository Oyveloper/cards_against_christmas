import React from "react";
import CardDisplay from "../components/CardDisplay";
import PlayerAvatar from "../components/PlayerAvatar";
import Game from "../core/Game";

import "./GameScreen.css";

type GameScreenProps = {
  game: Game;
};

export default function GameScreen({ game }: GameScreenProps) {
  const playerHand = game.userHand.map((card, i) => (
    <CardDisplay card={card} key={`hand-card-${i}`} />
  ));

  const oponents = game.players.map((player, i) => (
    <PlayerAvatar player={player} key={`oponent-${i}`} />
  ));

  const blackCard =
    game.currentBlackCard === null ? null : (
      <CardDisplay card={game.currentBlackCard} />
    );

  return (
    <div className="GameScreen">
      <div id="oponents">{oponents}</div>
      <div id="table">{blackCard}</div>
      <div id="player-hand">
        <div id="player-hand-card-container">{playerHand}</div>
      </div>
    </div>
  );
}
