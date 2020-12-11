import Card from "./Card";

class Player {
  name: string;
  score: number = 0;
  hand: Card[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public giveCard(card: Card) {
    this.hand.push(card);
  }

  public getNumberOfCards() {
    return this.hand.length;
  }
}

export default Player;
