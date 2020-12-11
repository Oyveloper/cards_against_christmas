import Card from "./Card";

class Player {
  name: string;
  score: number = 0;

  constructor(name: string) {
    this.name = name;
  }
}

export default Player;
