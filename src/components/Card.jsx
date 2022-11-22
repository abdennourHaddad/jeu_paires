import React from 'react';

import '../assets/style/card.css';

/** Une carte
 * => description : string
 * => src : string
 */
export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleHideDisplay() {
    console.log('display');
  }

  render() {
    // Si on affiche l'image alors on passe la bonne source d'image, soit la source soit le '?'
    let elt = <img onClick={() => this.props.clickOnImage(this.props.indice)} src={this.props.unknowSrc} alt={this.props.description} />
    if (!this.props.hided) {
      elt = <img src={this.props.src} alt={this.props.description} title={this.props.description} />
    }
    return (
      <div className='card'>
        {elt}
      </div>
    );
  }
}
