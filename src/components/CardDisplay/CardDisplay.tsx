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

/**
 * Displays a single white card
 * @param card - the card to show
 * @param onClick - event handler for click events
 * @param flipped - flag for flipping to the other side of the card
 * @param winnerCard - Flag for setting this as the winner card. will apply styles
 */
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

/**
 * Displays a single black card
 */
export function BlackCardDisplay({ card }: CardDisplayProps) {
  return <div className="card card-black">{card.text}</div>;
}
