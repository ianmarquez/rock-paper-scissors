import React from 'react';
import HandAtPlay, { handName } from '../models/HandAtPlay';
import "./HandButton.css"

interface Props {
  name: handName;
  onClick?: (hand: HandAtPlay) => void;
  active: boolean;
}

export default class HandButton extends React.Component<Props> {
  private hand : HandAtPlay;
  constructor(props : Props) {
    super(props);
    this.hand = new HandAtPlay(props.name);
  }

  private renderButton = () : React.ReactFragment => {
    const { name, active } = this.props;
    switch(name) {
      case "rock":
        return <i className={`fas fa-hand-rock ${active ? "active" : null}`}></i>;
      case "paper":
        return <i className={`fas fa-hand-paper ${active ? "active" : null}`}></i>;
      case "scissors":
        return <i className={`fas fa-hand-scissors ${active ? " active" : null}`}></i>;
    }
  }

  public render() : React.ReactFragment {
    const { onClick } = this.props
    return(
      <React.Fragment>
        <div className="hand-button" onClick={() => onClick && onClick(this.hand)}>
          {this.renderButton()}
        </div>
      </React.Fragment>
    )
  }
}