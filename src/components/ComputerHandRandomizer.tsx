import React from 'react';
import "./ComputerHandRandomizer.css"
import HandButton from './HandButton';
import HandAtPlay, { handName } from '../models/HandAtPlay';

interface Props {
  onGenerate: (hand: HandAtPlay) => void;
  selectedHand?: HandAtPlay;
}

const TIME_LIMIT = 5;

export default class ComputerHandRandomizer extends React.Component<Props> {
  protected timer: any;
  constructor(props: Props) {
    super(props);
  }

  private generateRandomHand = () : React.ReactFragment => {
    const { onGenerate, selectedHand } = this.props; 
    if (!selectedHand)  return <h2> Choose a hand </h2>;
    const handTypes : handName[] = ['rock', 'paper', 'scissors'];
    const getRandomInt = (max: number) : number => {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const randomHand : HandAtPlay = new HandAtPlay(handTypes[getRandomInt(handTypes.length)]);
    onGenerate(randomHand);
    return <HandButton name={randomHand.name}/>
  }

  public render() : React.ReactFragment {
    return this.generateRandomHand();
  }
}