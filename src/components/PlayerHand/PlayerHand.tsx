import React from "react";
import { Card } from "../../types";
import { WhiteCardDisplay } from "../CardDisplay/CardDisplay";

import "./PlayerHand.css";

type PlayerHandProps = {
  hand: Card[];
};

export default function PlayerHand({ hand }: PlayerHandProps) {
  const playerHand = hand.map((card, i) => (
    <WhiteCardDisplay card={card} key={`hand-card-${i}`} />
  ));

  return (
    <div className="player-hand">
      <div className="player-hand-card-container">{playerHand}</div>
    </div>
  );
}
