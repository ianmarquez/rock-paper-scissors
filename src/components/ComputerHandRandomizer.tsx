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

  shouldComponentUpdate(prevProps: Props) : boolean {
    const { selectedHand } = this.props;
    if (selectedHand) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps: Props) : void {
    if (this.props.selectedHand) {
      this.props.onGenerate(this.props.selectedHand)
    }
  }

  private generateRandomHand = () : React.ReactFragment => {
    const { selectedHand } = this.props; 
    if (!selectedHand)  return <h2> Choose a hand </h2>;
    const handTypes : handName[] = ['rock', 'paper', 'scissors'];
    const getRandomInt = (max: number) : number => {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const randomHand : HandAtPlay = new HandAtPlay(handTypes[getRandomInt(handTypes.length)]);
    return <HandButton name={randomHand.name} active={true}/>
  }

  public render() : React.ReactFragment {
    return this.generateRandomHand();
  }
}