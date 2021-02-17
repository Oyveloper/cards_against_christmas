import React from "react";

import "./GameTable.css";

export type GameTableProps = {
  isJudge: boolean;
  blackCard: JSX.Element;
  playedCards: JSX.Element[] | null;
};

export default function GameTable({
  isJudge,
  blackCard,
  playedCards,
}: GameTableProps) {
  return (
    <div id="table">
      {isJudge && <h2>You are the judge</h2>}
      <div id="table-cards-container">
        <div id="blackCard-container">{blackCard}</div>

        <div id="table-played">{playedCards}</div>
      </div>
    </div>
  );
}
