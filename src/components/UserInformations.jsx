import React from 'react';

import '../assets/style/infoZone.css';

/** La barre d'informations en bas du plateau de jeu
 * 
 */
export default class UserInformations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className=' infoZone'>
        <div className='remaining'>{this.props.remainingMessage}</div>
        <div className='last'>{this.props.description}</div>
        <div className='flips'>{this.props.trials} essais</div>
      </div>
    );
  }
}
