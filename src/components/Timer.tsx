import React from 'react';
import "./Timer.css"

interface Props {
  onTimerEnd: () => void;
  shouldStart: boolean;
}

interface State {
  currentTime: number;
}

const TIME_LIMIT = 5;

export default class Timer extends React.Component<Props, State> {
  protected timer: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTime: TIME_LIMIT,
    }
  }

  private startTimer = (): void => {
    this.timer = setInterval(() => {
      const { currentTime } = this.state;
      const { onTimerEnd } = this.props;

      if(currentTime === 0) {
        clearInterval(this.timer);
        this.timer = null;
        onTimerEnd();
        return;
      }

      this.setState({
        currentTime: currentTime - 1,
      })
    }, 1000);
  }

  public componentDidUpdate(prevProps: Props) : void {
    if(prevProps.shouldStart !== this.props.shouldStart && this.props.shouldStart) {
      this.startTimer();
    }
  }

  public componentDidMount() : void {
    const { shouldStart } = this.props;
    if(shouldStart) {
      this.startTimer();
    }
  }

  public render() : React.ReactFragment {
    const { currentTime } = this.state;
    return (
      <React.Fragment>
        <div className="timer">
          <div className="row">
            <h1>{currentTime}</h1>
          </div>
          <div className="row">
            <h3>Timer</h3>
          </div>
        </div>
      </React.Fragment>
    )
  }
}