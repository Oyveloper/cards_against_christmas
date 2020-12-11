import Card from "./Card";
import Player from "./Player";

export default class Game {
  id: string;
  players: Player[];
  deck: Card[];
  currentJudge: Player | null = null;

  constructor(id: string, players: Player[], deck: Card[]) {
    this.id = id;
    this.players = players;
    this.deck = deck;
  }

  public dealCards() {
    for (var i = 0; i < 7; i++) {
      this.players.forEach((player) => {
        let card = this.deck.pop();
        if (!(typeof card === "undefined")) {
          player.giveCard(card);
        }
      });
    }
  }
}
