import React from 'react';
import Clock from './Clock.jsx';

import '../assets/style/controls.css';

/** Les options de jeu.
 * 
 */
export default class Parameters extends React.Component {
  constructor(props) {
    super(props);
    this.clockRef = React.createRef();
  }

  handlePairsInput(event) {
    this.props.setPairsNumbers(event.target.value);
  }

  render() {

    let btn;
    if (this.props.isRunning) {
      btn = <button onClick={this.props.stopSession}>Stop.</button>;
    }
    else {
      btn = <button onClick={this.props.startSession}>C'est parti !</button>;
    }

    return (
      <div className='controls'>
        <div className='paires'>nb paires :<input disabled={this.props.isRunning} onChange={this.handlePairsInput.bind(this)} type='number' name='paires' min={0} max={this.props.maxPairs} defaultValue={4} /></div>
        <div className=''>{btn}</div>
        <div className=''><Clock ref={this.clockRef} /></div>
      </div>
    );
  }
}
