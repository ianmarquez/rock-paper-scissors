import React from 'react';

import './App.css';
import ComputerHandRandomizer from './components/ComputerHandRandomizer';
import HandAtPlay, { handName } from './models/HandAtPlay';
import HandButton from './components/HandButton';

type GameMode = "computer" | "player";
interface ComponentState {
  gameIsDone: boolean;
  gameMode?: GameMode;
  selectedHand? : HandAtPlay;
  opponentHand? : HandAtPlay;
}

const MenuView = (props: { onGameModeSelect : (gameMode: GameMode) => void}) => {
  return (
    <React.Fragment>
      <br />
      <div className="row" style={{ marginTop: 50 }}>
        <h2>Select Play Mode</h2>
      </div>
      <div className="row" style={{ marginTop: 50 }}>
        <button onClick={() => props.onGameModeSelect("player")}>Player vs Computer</button>
      </div>
      <div className="row" style={{ marginTop: 50 }}>
        <button onClick={() => props.onGameModeSelect("computer")}>Computer vs Computer</button>
      </div>
    </React.Fragment>
  )
}

export default class App extends React.Component<any, ComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      gameIsDone: false,
    }
  }

  private onGameModeSelect = (gameMode: GameMode): void => {
    this.setState({
      gameMode
    });
  }

  private onGenerate = (opponentHand: HandAtPlay) : void => {
    //do something based on requirement
    const { selectedHand } = this.state;
    if (selectedHand) {
      this.setState({
        opponentHand: opponentHand
      });
    }
    
  }

  private onButtonClick = (hand: HandAtPlay) : void => {
    this.setState({
      selectedHand: hand,
    })
  }

  private renderBorder = () : React.ReactFragment => {
    const { gameMode, opponentHand, selectedHand } = this.state;

    if(!!opponentHand && !!selectedHand) {
      const result: number = selectedHand.didWin(opponentHand);
      let message: string = '';
      switch (result) {
        case 1:
          message = "Draw!"
        case 2:
          message = "You Win!"
        case 3:
          message = "You Lose!"
      }
      return (
        <React.Fragment>
          <h1 style={{ textTransform: "uppercase" }}>
            {message}
          </h1>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h3 style={{ color: "black" }}>Computer</h3>
        <hr style={{ width: "70%" }} />
        <h3 style={{ color: "black", textTransform: "capitalize" }}>{gameMode}</h3>
      </React.Fragment>
    )
  }


  public render() : React.ReactFragment {
    const { gameMode, selectedHand } = this.state;
    return (
      <div className="App">
        {gameMode ? <React.Fragment>
          <br/>
          <ComputerHandRandomizer onGenerate={this.onGenerate} selectedHand={selectedHand}/>  
          {this.renderBorder()}
          <div id="hand-button-container">
            <HandButton name="rock" onClick={this.onButtonClick} active={!!selectedHand && selectedHand.name === "rock"}/>
            <HandButton name="paper" onClick={this.onButtonClick} active={!!selectedHand && selectedHand.name === "paper"}/>
            <HandButton name="scissors" onClick={this.onButtonClick} active={!!selectedHand && selectedHand.name === "scissors"}/>
          </div>
        </React.Fragment> 
        :
          <MenuView onGameModeSelect={this.onGameModeSelect} /> }
      </div>
    )
  }
}