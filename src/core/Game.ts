import Card, { CardType } from "./Card";
import Player from "./Player";

export default class Game {
  id: string;
  players: Player[];
  userHand: Card[] = [];
  currentJudge: Player | null = null;

  /**
   * @param id - the unique game id
   * @param players - a list of all players involved, including the local user
   */
  constructor(id: string, players: Player[]) {
    this.id = id;
    this.players = players;
  }

  /**
   * Draws a card for the local user and adds it to their hand
   */
  public drawCard() {
    this.userHand.push(new Card(CardType.WHITE, "some random text"));
  }
}
