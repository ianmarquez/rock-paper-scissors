import { winsAgainstObj } from '../constants/AppConstants'

export type handName = 'rock' | 'paper' | 'scissors';

export default class HandAtPlay {
  readonly name: handName;
  readonly winsAgainst: handName[];

  constructor(name: handName) {
    this.name = name;
    this.winsAgainst = winsAgainstObj[name];
  }

  public didWin(opponentHand: HandAtPlay) : 1 | 2 | 3 {
    if(!!this.isEqual(opponentHand)) {
      return 1; // draw
    } else if (-1 < this.winsAgainst.indexOf(opponentHand.name)) {
      return 2; // winning hand
    } else {
      return 3 // losing hand
    }
  }

  public isEqual(opponentHand: HandAtPlay) : boolean {
    return this.name === opponentHand.name;
  }
}