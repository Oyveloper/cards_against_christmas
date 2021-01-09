import React from "react";
import { Card, BlackCard } from "../../types";

import "./CardDisplay.css";

type CardDisplayProps = {
  card: Card;
};

export function WhiteCardDisplay({ card }: CardDisplayProps) {
  return <div className="card card-white">{card.text}</div>;
}

export function BlackCardDisplay({ card }: CardDisplayProps) {
  return <div className="card card-black">{card.text}</div>;
}
