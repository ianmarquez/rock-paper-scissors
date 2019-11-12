import React from 'react';

import './App.css';
import ComputerHandRandomizer from './components/ComputerHandRandomizer';
import HandAtPlay, { handName } from './models/HandAtPlay';
import HandButton from './components/HandButton';

type GameMode = "computer" | "player";
interface ComponentState {
  gameMode?: GameMode;
  score: number;
  selectedHand? : HandAtPlay
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
      score: 0,
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
      const results = selectedHand.didWin(opponentHand);
      console.log(results);
    }
    
  }

  private onButtonClick = (hand: HandAtPlay) : void => {
    this.setState({
      selectedHand: hand,
    })
  }

  private renderBorder = () : React.ReactFragment => {
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
        {!gameMode && <MenuView onGameModeSelect={this.onGameModeSelect}/>}
        {gameMode && <React.Fragment>
          <br/>
          <ComputerHandRandomizer onGenerate={this.onGenerate} selectedHand={selectedHand}/>  
          {this.renderBorder()}
          <div id="hand-button-container">
            <HandButton name="rock" onClick={this.onButtonClick}/>
            <HandButton name="paper" onClick={this.onButtonClick}/>
            <HandButton name="scissors" onClick={this.onButtonClick}/>
          </div>
        </React.Fragment>}
      </div>
    )
  }
}