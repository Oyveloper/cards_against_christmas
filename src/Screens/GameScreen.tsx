import React, { useContext, useEffect, useState } from "react";
import { navigate, RouteComponentProps } from "@reach/router";

import "./GameScreen.css";
import GameDisplay from "../components/GameDisplay/GameDisplay";
import { JoinGameContext } from "../App";

export default function GameScreen(props: RouteComponentProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [gameReady, setGameReady] = useState(false);
  const joinGameData = useContext(JoinGameContext);

  useEffect(() => {
    try {
      const gameInfo = joinGameData.joinGameData;
      if (gameInfo.gameId === "" || gameInfo.playerName === "") {
        throw new Error("No game id");
      }

      setPlayerName(gameInfo.playerName);
      setGameId(gameInfo.gameId);
      setGameReady(true);
    } catch (e) {
      console.log(e);
      navigate("/joinGame");
    }
  }, [joinGameData]);

  return gameReady ? (
    <GameDisplay id={gameId} playerName={playerName} />
  ) : (
    <h2>Loading...</h2>
  );
}
