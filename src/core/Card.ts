export enum CardType {
  BLACK,
  WHITE,
}

export default class Card {
  type: CardType;
  text: string;

  constructor(type: CardType, text: string) {
    this.type = type;
    this.text = text;
  }
}
