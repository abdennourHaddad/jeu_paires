import React from 'react';
import Card from './Card.jsx';

import '../assets/style/cardBoard.css';

/** Plateau de jeu
 * cartes => la liste des données de chaque carte.
 */
export default class CardBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cartes = this.props.cardData.map((carte, id) => <Card key={carte.id} 
                                                                    indice={carte.id} 
                                                                    clickOnImage={this.props.clickOnImage} 
                                                                    hided={carte.hided} 
                                                                    unknowSrc={this.props.unknowSrc} 
                                                                    src={carte.src} 
                                                                    description={carte.description} />);
        return (
            <div id='main-cardboard'>
                {cartes}
            </div>
        );
    }
}
