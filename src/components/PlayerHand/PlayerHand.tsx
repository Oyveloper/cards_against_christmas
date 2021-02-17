import React from "react";
import { Card } from "../../types";
import { WhiteCardDisplay } from "../CardDisplay/CardDisplay";

import "./PlayerHand.css";

type PlayerHandProps = {
  hand: Card[];
  playCard: (card: Card) => void;
};

export default function PlayerHand({ hand, playCard }: PlayerHandProps) {
  const playerHand = hand.map((card, i) => (
    <WhiteCardDisplay
      card={card}
      key={`hand-card-${i}`}
      onClick={(e) => {
        playCard(card);
      }}
    />
  ));

  return (
    <div className="player-hand">
      <div className="player-hand-card-container">{playerHand}</div>
    </div>
  );
}
