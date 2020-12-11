import Card from "./Card";

class Player {
  name: string;
  score: number;
  hand: Card[] = [];

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  public giveCard(card: Card) {
    this.hand.push(card);
  }

  public getNumberOfCards() {
    return this.hand.length;
  }
}

export default Player;
