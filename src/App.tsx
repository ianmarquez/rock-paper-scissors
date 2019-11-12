import React from 'react';

import './App.css';
import Timer from './components/Timer';
import HandAtPlay from './models/HandAtPlay';

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

  private onTimerEnd = () : void => {
    //do something based on requirement
    console.log('time ran out');
  }

  private shouldTimerStart = () : boolean => {
    const { gameMode, selectedHand } = this.state;
    let shouldStart = true;
    if(gameMode) {
      if(gameMode === "player") {
        shouldStart = false;
        if(selectedHand) {
          shouldStart = true;
        }
      }
    }
    return shouldStart;
  }

  public render() : React.ReactFragment {
    const { score, gameMode } = this.state;
    return (
      <div className="App">
        {!gameMode && <MenuView onGameModeSelect={this.onGameModeSelect}/>}
        {gameMode && <React.Fragment>
          <br/>
          <Timer onTimerEnd={this.onTimerEnd} shouldStart={this.shouldTimerStart()}/>  
          <h3 style={{ color: "black"}}>Computer</h3>
          <hr style={{ width: "70%" }}/>
          <h3 style={{ color: "black", textTransform: "capitalize"  }}>{gameMode}</h3>
        </React.Fragment>}
      </div>
    )
  }
}