import React, { useContext, useState } from "react";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { createGame } from "../core/GameInfo";
import { JoinGameContext } from "../App";

export default function CreateGameScreen(props: RouteComponentProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [error] = useState("");
  const { setJoinGameData } = useContext(JoinGameContext);
  const navigate = useNavigate();

  const submitCreateGame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let gameId = await createGame();

    setJoinGameData({ gameId: gameId, playerName: playerName });

    await navigate("/game");
  };

  return (
    <div className="GameScreen">
      <form action="" id="join-game-form" onSubmit={submitCreateGame}>
        <h1>Join a game</h1>
        <p style={{ color: "red" }}>{error}</p>
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
          Create game
        </button>
      </form>
    </div>
  );
}
