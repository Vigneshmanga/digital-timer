import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timerOn: false,
    minutes: 25,
    seconds: 0,
    timer: 25,
    resetEnabled: true,
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      resetEnabled: false,
    });
    
    this.intervalId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.minutes === 0 && prevState.seconds === 0) {
          this.stopTimer()
          return {timerOn: false, minutes: 0, seconds: 0}
        }
        const updatedSeconds =
          prevState.seconds === 0 ? 59 : prevState.seconds - 1
        const updatedMinutes =
          prevState.seconds === 0 ? prevState.minutes - 1 : prevState.minutes
        return {
          timerOn: true,
          minutes: updatedMinutes,
          seconds: updatedSeconds,
          resetEnabled: false,
        }
      })
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.intervalId)
    this.setState({timerOn: false})
  }

  onReset = () => {
    const {timerOn} = this.state
    if (timerOn) {
      this.stopTimer()
    }
    this.setState({minutes: 25, seconds: 0, resetEnabled: true})
  }

  timerOnIncrement = () => {
    const {timerOn, resetEnabled} = this.state
    if (!timerOn && resetEnabled) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        timer: prevState.timer + 1,
      }))
    }
  }

  timerOnDecrement = () => {
    const {timerOn, resetEnabled, timer} = this.state
    if (!timerOn && resetEnabled && timer !== 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        timer: prevState.timer - 1,
      }))
    }
  }

  update = () => {
    const {timerOn} = this.state
    if (timerOn) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  render() {
    const {timerOn, minutes, seconds, timer} = this.state
    let startBtnAlt
    let startBtnSrc
    if (timerOn) {
      startBtnAlt = 'pause icon'
      startBtnSrc =
        'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    } else {
      startBtnAlt = 'play icon'
      startBtnSrc = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    }

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="count-container">
            <div className="count">
              <h1 className="running-counter">
                {minutes < 10 ? '0' : null}
                {minutes}:{seconds < 10 ? '0' : null}
                {seconds}
              </h1>
              <p className="timer-state">{timerOn ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-setting-container">
            <div className="pause-play-container">
              <div className="pause-container">
                <button
                  type="submit"
                  className="pause-btn"
                  onClick={this.update}
                >
                  <img
                    alt={startBtnAlt}
                    src={startBtnSrc}
                    className="btn-icon"
                  />
                  {timerOn ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="reset-container">
                <button
                  onClick={this.onReset}
                  className="reset-btn"
                  type="button"
                >
                  <img
                    className="btn-icon"
                    alt=" reset icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="set-timer-desc">set timer limit</p>
            <div className="timer-adjusting-container">
              <button onClick={this.timerOnDecrement} type="button">
                -
              </button>
              <p className="timer-limit">{timer}</p>
              <button onClick={this.timerOnIncrement} type="button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
