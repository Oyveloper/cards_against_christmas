import React, { useEffect, useState } from "react";
import { BlackCardDisplay, WhiteCardDisplay } from "../CardDisplay/CardDisplay";
import PlayerHand from "../PlayerHand/PlayerHand";
import useGameServer from "../../core/GameServer";

import "./GameDisplay.css";
import GameDisplayHeader from "../GameDisplayHeader/GameDisplayHeader";
import { Card } from "../../types";
import GameTable from "../GameTable/GameTable";

type GameScreenProps = {
  id: string;
  playerName: string;
};

export default function GameDisplay({ id, playerName }: GameScreenProps) {
  const [gameServer, gameState] = useGameServer(id, playerName);
  const [isHost, setIsHost] = useState(false);
  const [isJudge, setIsJudge] = useState(false);

  const hasPlayedCardThisRound = () =>
    gameState.currentRound?.playedCards.hasOwnProperty(playerName);

  const hasGameStarted = () => gameState.rounds.length > 0;
  const enoughPlayers = () => gameState.players.length >= 3;
  const everyoneHasPlayedCard = () =>
    gameState.currentRound
      ? Object.keys(gameState.currentRound?.playedCards).length ===
        gameState.players.length - 1
      : false;
  const isRoundFinished = () =>
    hasGameStarted() && gameState.currentRound?.winner !== null;

  // Checking if we are host
  useEffect(() => {
    if (gameState.players.length > 0) {
      setIsHost(
        gameState.players.filter((p) => p.name === playerName)[0].isHost
      );
    }

    setIsJudge(gameState.currentRound?.judge.name === playerName);
  }, [gameState, playerName]);

  // Handle game loading
  if (gameState.loading) {
    return (
      <div className="GameScreen GameDisplay-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  // handler for starting a round
  const startGame = () => {
    if (enoughPlayers()) {
      gameServer.newRound();
    }
  };

  // Handler for playing a certain card
  const playCard = (card: Card) => {
    if (!hasPlayedCardThisRound() && hasGameStarted() && !isJudge) {
      gameServer.playCard(card, gameState.userHand);
    }
  };

  const chooseCard = (card: Card) => {
    console.log("trying to choose a card");
    if (everyoneHasPlayedCard && isJudge) {
      console.log("we are going to actually choose it");
      gameServer.chooseCard(card);
    }
  };

  // Display all the played cards this round
  const playedCards = gameState.currentRound
    ? Object.entries(gameState.currentRound?.playedCards).map(
        ([playerName, card]) => (
          <WhiteCardDisplay
            flipped={!everyoneHasPlayedCard() || !hasGameStarted()}
            winnerCard={
              isRoundFinished() &&
              card.id === gameState.currentRound?.winnerCard.id
            }
            card={card}
            onClick={() => {
              chooseCard(card);
            }}
          />
        )
      )
    : null;

  // Display the round's black card
  const blackCard =
    gameState.currentRound === null ? (
      <h2>Waiting for game to start...</h2>
    ) : (
      <BlackCardDisplay card={gameState.currentRound.blackCard} />
    );

  return (
    <div className="GameDisplay">
      <GameDisplayHeader
        players={gameState.players}
        id={id}
        showStartGame={isHost && !hasGameStarted()}
        showNextRound={isHost && isRoundFinished()}
        startGame={startGame}
        judgeName={
          gameState.currentRound ? gameState.currentRound?.judge.name : ""
        }
      />
      <GameTable
        isJudge={isJudge}
        blackCard={blackCard}
        playedCards={playedCards}
      />
      <PlayerHand hand={gameState.userHand} playCard={playCard} />
    </div>
  );
}
