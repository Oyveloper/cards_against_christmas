import React, { useState } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { gameExists, isPlayerNameTaken } from "../core/GameInfo";

export default function JoinGameScreen(props: RouteComponentProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [error, setError] = useState("");

  const submitJoinGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await gameExists(gameId))) {
      setError("The game does not exist");
    } else if (await isPlayerNameTaken(playerName, gameId)) {
      setError("The username is taken");
    } else {
      setError("");
    }

    navigate("/game", { state: { gameId: gameId, playername: playerName } });
  };

  return (
    <div className="GameScreen">
      <form action="" id="join-game-form" onSubmit={submitJoinGame}>
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
}
