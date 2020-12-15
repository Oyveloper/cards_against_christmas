import { Card } from "../types";

export class GameServer {
  id: string;
  updateMethod: (args: any) => void;

  constructor(id: string, updateMethod: (args: any) => void) {
    this.id = id;
    this.updateMethod = updateMethod;
  }

  connect() {}

  playCard(card: Card) {}

  chooseCard(card: Card) {}

  drawCard(): Card {
    return { text: "hell", id: "12" };
  }

  onNewRound() {}

  onPlayersChange() {}

  onRoundWon() {}

  onCardPlayed() {}

  onGameStart() {}

  onGameOver() {}
}

export default function useGameServer(
  id: string,
  updateGame: (args: any) => void
) {
  let server = new GameServer(id, updateGame);
  const setGameServer = (newServer: GameServer) => (server = newServer);

  server.connect();

  return [server, setGameServer];
}
