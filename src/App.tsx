import React from "react";
import "./App.css";
import Card, { CardType } from "./core/Card";
import Game from "./core/Game";
import Player from "./core/Player";

import GameScreen from "./Screens/GameScreen";

function App() {
  let players: Player[] = [];

  for (var i = 0; i < 4; i++) {
    players.push(new Player(`Player${i}`));
  }

  const game: Game = new Game("123", players, new Player("local"));

  for (i = 0; i < 7; i++) {
    game.drawCard();
  }

  game.setJudge(game.players[0]);
  game.drawBlackCard();

  return (
    <div className="App">
      <GameScreen game={game} />
    </div>
  );
}

export default App;
