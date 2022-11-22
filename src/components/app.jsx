import React from 'react';
import Memory from './Memory.jsx';

/*
 define root component
*/
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Memory nPaires={4} />
      </div>
    );
  }
}
