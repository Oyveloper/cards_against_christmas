import React from "react";
import { Card, BlackCard } from "../types";

import "./CardDisplay.css";

type CardDisplayProps = {
  card: Card;
};

export default function CardDisplay({ card }: CardDisplayProps) {
  return <div className={`card card-${typeof card}`}>{card.text}</div>;
}
