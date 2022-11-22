import React from 'react';

import '../assets/style/controls.css';

/** Une carte
 * => description : string
 * => src : string
 */
export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            intervalId: [],
            run: true
        };
    }

    timeUp() {
        console.log("+1");
        if (this.state.run) {
            this.state.time += 1;
            this.setState({ time: this.state.time });
        }
    }

    start() {
        clearInterval(this.state.intervalId);
        this.state.intervalId.push(setInterval(this.timeUp.bind(this), 1000));
        this.setState({ intervalId: this.state.intervalId });
        this.setState({ run: true });

    }

    stop() {
        this.setState({ run: false });
    }

    raz() {
        console.log('raz');
        this.state.intervalId.forEach(id => { clearInterval(id); });
        this.state.intervalId = [];
        this.setState({ time: 0, intervalId: this.state.intervalId });
    }

    render() {
        return (
            <div className='clock'>{this.state.time} sec</div>
        );
    }
}
