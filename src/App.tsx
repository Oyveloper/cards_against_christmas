import React from "react";
import "./App.css";
import Card, { CardType } from "./core/Card";
import Game from "./core/Game";
import Player from "./core/Player";

import GameScreen from "./Screens/GameScreen";

function App() {
  let players: Player[] = [];
  let deck: Card[] = [];

  for (var i = 0; i < 4; i++) {
    players.push(new Player(`Player${i}`));
  }

  for (var i = 0; i < 30; i++) {
    deck.push(new Card(CardType.BLACK, `haha så morsomt, ${i}`));
  }

  const game: Game = new Game("123", players, deck);

  game.dealCards();

  return (
    <div className="App">
      <GameScreen game={game} />
    </div>
  );
}

export default App;
