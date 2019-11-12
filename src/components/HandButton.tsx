import React from 'react';
import HandAtPlay, { handName } from '../models/HandAtPlay';
import "./HandButton.css"

interface Props {
  name: handName;
  onClick?: (hand: HandAtPlay) => void;
}

export default class HandButton extends React.Component<Props> {
  private hand : HandAtPlay;
  constructor(props : Props) {
    super(props);
    this.hand = new HandAtPlay(props.name);
  }

  public render() : React.ReactFragment {
    const { name, onClick } = this.props
    return(
      <React.Fragment>
        <div className="hand-button" onClick={() => onClick && onClick(this.hand)}>
          {name === "rock" && <i className="far fa-hand-rock"></i>}
          {name === "paper" && <i className="far fa-hand-paper"></i>}
          {name === "scissors" && <i className="far fa-hand-scissors"></i>}
        </div>
      </React.Fragment>
    )
  }
}