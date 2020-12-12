import Card from "./Card";

class Player {
  name: string;
  score: number = 0;
  isJudge = false;

  constructor(name: string) {
    this.name = name;
  }
}

export default Player;
