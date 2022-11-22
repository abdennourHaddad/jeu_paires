import React from 'react';
import CardBoard from './CardBoard.jsx';
import Parameters from './Parameters.jsx';
import UserInformations from './UserInformations.jsx';

import { UNKNOWN_SRC, cardData } from '../data/cardData.js';
import { shuffle } from '../scripts/utils.js';
import '../assets/style/memory.css';

/** Jeu de mémoire
 * 
 */
export default class Memory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  cardList: [], 
                        doubleCards: [], 
                        cycleReady: true,
                        npairs: 4,
                        remaining: 4,
                        currentDescription: "?",
                        trials: 0,
                        running: false
                    };
        this.paramRef = React.createRef();
    }

    componentDidMount() {
        // il y a n paires
        this.state.npairs = this.props.nPaires;
        this.setState({ npairs: this.state.npairs });
        // Il reste nPaires
        this.state.remaining = this.props.nPaires;
        this.setState({ remaining: this.state.remaining });

        // Sélection de n cartes aléatoire où n est le nombre de paires.
        let cards = shuffle(cardData.map ((card, index) => ({ ...card, hided: true }) ))
                                    .filter((value, index) => { return index < this.props.nPaires; });
                                    
        cards = shuffle(cards.concat(cards));
        cards = cards.map((card, index) => ({...card, id: index}));
        console.log(cards);
        this.setState( { cardList : cards});
    }

    clickOnImage(imgIndice) {
        // Si la carte n'est pas déjà retournée, que le cycle est prêt et que la session est en cours.
        if(this.state.cardList[imgIndice].hided && this.state.cycleReady && this.state.running) {
            // La carte se dévoile.
            this.state.cardList[imgIndice].hided = false;
            this.setState( { cardList : this.state.cardList });

            // Ajout de la nouvelle carte retournée dans le double.
            this.state.doubleCards.push(this.state.cardList[imgIndice]);
            this.setState( { doubleCards: this.state.doubleCards } );
            
            // La description actuel est  celle de la carte retourné
            this.state.currentDescription = this.state.cardList[imgIndice].description;
            this.setState({ currentDescription: this.state.currentDescription });

            // Vérification du double retournée actuel.
            if(this.state.doubleCards.length == 2) {
                // les cartes retournées sont-elles les mêmes ?
                if(this.state.doubleCards[0].description == this.state.doubleCards[1].description) {
                    // Effacement du double actuel
                    this.state.doubleCards = [];
                    this.setState({ doubleCards: this.state.doubleCards});
                    // Diminution des doubles restants
                    this.state.remaining -= 1;
                    this.setState({ remaining: this.state.remaining });
                    // Gagné ?
                    if(this.state.remaining <= 0) {
                        this.win();
                    }
                }
                else { // Sinon on les caches à nouveau 1 sec après et on réinitialise doubleCards
                    function hideDoubleCards() {
                        // Masquage du double
                        this.state.doubleCards.forEach(card => {
                            this.state.cardList[card.id].hided = true;
                        });
                        this.setState({ cardList: this.state.cardList });
                        // Effacement du doubles actuel
                        this.state.doubleCards = [];
                        this.setState({ doubleCards: this.state.doubleCards});
                        // Réactivation du cycle
                        this.state.cycleReady = true;
                        this.setState({ cycleReady: this.state.cycleReady });
                    }
                    // Le cyle est désactivé
                    this.state.cycleReady = false;
                    this.setState({ cycleReady: this.state.cycleReady });
                    // On cache le double retourné après 1 seconde
                    setTimeout(hideDoubleCards.bind(this), 1000);
                }
                
                // La description actuel est  "?".
                this.state.currentDescription = "?";
                this.setState({ currentDescription: this.state.currentDescription });
            }
            else {
                // Un essai en plus.
                this.state.trials += 1;
                this.setState({ trials: this.state.trials });
            }
        }
    }

    startSession() {
        console.log('start session');
        // Il reste nPaires
        this.setState({ remaining: this.state.npairs });
        
        // incrémentation du temps chaque seconde

        // nombre d'essais raz
        this.setState({ trials: 0 });

        // cycle ready raz
        this.setState({ cycleReady: true });

        // les listes raz
        this.setState({ cardList: [], doubleCards: [] });

        // Sélection de n cartes aléatoire où n est le nombre de paires.
        let cards = shuffle(cardData.map ((card, index) => ({ ...card, hided: true }) ))
                                    .filter((value, index) => { return index < this.state.npairs; });
                                    
        cards = shuffle(cards.concat(cards));
        cards = cards.map((card, index) => ({...card, id: index}));
        console.log(cards);
        this.setState( { cardList : cards});

        // La partie est en cours
        this.setState({ running: true });
        
        // L'horloge tourne
        this.paramRef.current.clockRef.current.raz();
        this.paramRef.current.clockRef.current.start();

    }

    stopSession() {
        this.setState({ running: false });
        this.paramRef.current.clockRef.current.stop();
    }

    win() {
        this.stopSession();
    }

    setPairsNumbers(nbPairs) {
        // il y a n paires
        this.setState({ npairs: nbPairs });
    }

    render() {
        let infos = null;
        if(this.state.remaining <= 0) {
            infos =  <UserInformations  remainingMessage="Gagné !" 
                                        description={this.state.currentDescription} 
                                        trials={this.state.trials}/>
        }
        else {
            infos =  <UserInformations  remainingMessage={"encore " + this.state.remaining + " paires"} 
                                        description={this.state.currentDescription} 
                                        trials={this.state.trials}/>
        }
        
        return (
        <div id='memory-game'>
            <Parameters ref={this.paramRef} isRunning={this.state.running} maxPairs={cardData.length} setPairsNumbers={this.setPairsNumbers.bind(this)} stopSession={this.stopSession.bind(this)} startSession={this.startSession.bind(this)} time={this.state.time} />
            <CardBoard clickOnImage={this.clickOnImage.bind(this)} unknowSrc={UNKNOWN_SRC} cardData={this.state.cardList}/>
            {infos}
        </div>
        );
    }
}


