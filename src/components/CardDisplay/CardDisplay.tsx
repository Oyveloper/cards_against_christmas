import React from "react";
import { Card } from "../../types";

import "./CardDisplay.css";

type CardDisplayProps = {
  card: Card;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void | undefined;
  flipped?: boolean;
  winnerCard?: boolean;
};

export function WhiteCardDisplay({
  card,
  onClick,
  flipped = false,
  winnerCard = false,
}: CardDisplayProps) {
  return (
    <div
      className={`card card-white ${winnerCard ? "card-winner" : ""}`}
      onClick={onClick}
    >
      {!flipped ? (
        card.text
      ) : (
        <div>
          <h3>Cards Against christmas</h3>
        </div>
      )}
    </div>
  );
}

export function BlackCardDisplay({ card }: CardDisplayProps) {
  return <div className="card card-black">{card.text}</div>;
}
