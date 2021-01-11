import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";

import "./GameScreen.css";
import GameDisplay from "../components/GameDisplay/GameDisplay";
import { gameExists, isPlayerNameTaken } from "../core/GameInfo";

export default function GameScreen(props: RouteComponentProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [gameJoined, setGameJoined] = useState(false);
  const [error, setError] = useState("");

  const joinGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await gameExists(gameId))) {
      setError("The game does not exist");
    } else if (await isPlayerNameTaken(playerName, gameId)) {
      setError("The username is taken");
    } else {
      setError("");
      setGameJoined(true);
    }
  };

  if (!gameJoined) {
    return (
      <div className="GameScreen">
        <form action="" id="join-game-form" onSubmit={joinGame}>
          <h1>Join a game</h1>
          <p style={{ color: "red" }}>{error}</p>
          <section id="gameIdSection" className="game-form-section">
            <label htmlFor="gameId">Game ID</label>
            <input
              type="text"
              name="gameId"
              id="gameId"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
            />
          </section>
          <section id="playerNameSection" className="game-form-section">
            <label htmlFor="playerName">Player Name</label>
            <input
              type="text"
              name="playerName"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </section>

          <button className="main" type="submit">
            Join game
          </button>
        </form>
      </div>
    );
  } else {
    return <GameDisplay id={gameId} playerName={playerName} />;
  }
}
