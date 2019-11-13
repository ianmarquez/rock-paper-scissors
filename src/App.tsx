import React from 'react';

import './App.css';
import HandAtPlay, { handName } from './models/HandAtPlay';
import HandButton from './components/HandButton';

type GameMode = "computer" | "player";
interface ComponentState {
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
    this.state = {};
  }

  private onGameModeSelect = (gameMode: GameMode): void => {
    this.setState({
      gameMode
    }, () => {
      if(gameMode === "computer") {
        this.setState({
          opponentHand: this.generateRandomHand(),
          selectedHand: this.generateRandomHand(),
        })
      }
    });
  }

  private onButtonClick = (hand: HandAtPlay) : void => {
    const { opponentHand, selectedHand, gameMode } = this.state;
    if(!!opponentHand && !!selectedHand || gameMode === "computer") return;
    this.setState({
      selectedHand: hand,
      opponentHand: this.generateRandomHand()
    })
  }

  private playAgain = () : void => {
    const { gameMode } = this.state;
    if (gameMode) {
      if(gameMode === "player") {
        this.setState({ 
          opponentHand: undefined, 
          selectedHand: undefined 
        });
      } else {
        this.setState({ 
          opponentHand: this.generateRandomHand(), 
          selectedHand: this.generateRandomHand(), 
        })
      }
     }
    
  }

  private renderBorder = () : React.ReactFragment => {
    const { gameMode, opponentHand, selectedHand } = this.state;

    if(!!opponentHand && !!selectedHand) {
      const result: number = selectedHand.didWin(opponentHand);
      let message: string = selectedHand.getWinningText(result);
      return (
        <React.Fragment>
          <br/>
          <h1 style={{ textTransform: "uppercase", marginTop: 30 }}>
            {message}
          </h1>
          <div id="menu-button-container">
            <button onClick={this.playAgain}>Play Again</button>
            <button onClick={() => this.setState({gameMode : undefined, opponentHand: undefined, selectedHand: undefined})}>Change GameMode</button>
          </div>
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

  private generateRandomHand = (): HandAtPlay => {
    const handTypes: handName[] = ['rock', 'paper', 'scissors'];
    const getRandomInt = (max: number): number => {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const randomHand: HandAtPlay = new HandAtPlay(handTypes[getRandomInt(handTypes.length)]);
    return randomHand;
  }


  public render() : React.ReactFragment {
    const { gameMode, selectedHand, opponentHand } = this.state;
    return (
      <div className="App">
        {gameMode ? <React.Fragment>
          <br/>
          {
            selectedHand && opponentHand ? 
             <HandButton name={opponentHand.name} active={true}/>
            :
            <h2 style={{marginTop: 20, marginBottom: 20}}> Choose a hand </h2>
          }
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