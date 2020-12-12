import Card, { CardType } from "./Card";
import Player from "./Player";

export default class Game {
  id: string;
  players: Player[];
  localPlayer: Player;
  userHand: Card[] = [];
  currentJudge: Player | null = null;
  currentBlackCard: Card | null = null;

  /**
   * @param id - the unique game id
   * @param players - a list of all players involved, except the local user
   */
  constructor(id: string, players: Player[], localPlayer: Player) {
    this.id = id;
    this.players = players;
    this.localPlayer = localPlayer;
  }

  /**
   * Draws a card for the local user and adds it to their hand
   */
  public drawCard() {
    this.userHand.push(new Card(CardType.WHITE, "some random text"));
  }

  drawBlackCard() {
    this.currentBlackCard = new Card(
      CardType.BLACK,
      "some stuff ____ or some ____"
    );
  }

  /**
   * sets the current judge to be the given player
   * @param player - the player to be judge
   */
  setJudge(player: Player) {
    if (this.currentJudge) {
      this.currentJudge.isJudge = false;
    }
    this.currentJudge = player;
    player.isJudge = true;
  }
}
