import React from 'react';
import HandAtPlay, { handName } from '../models/HandAtPlay';

interface Props {
  name: handName;
}

export default class HandButton extends React.Component<Props> {
  private hand : HandAtPlay;
  constructor(props : Props) {
    super(props);
  }

  public componentDidMount() : void {
    const { name } = this.props;
    this.hand = new HandAtPlay(name);
  }

  public render() : React.ReactFragment {
    return(
      <React.Fragment>

      </React.Fragment>
    )
  }
}