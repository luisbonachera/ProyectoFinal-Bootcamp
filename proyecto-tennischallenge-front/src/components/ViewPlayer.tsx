import React from 'react';
import { IPlayer } from '../interfaceIPlayer';
import { RouteComponentProps } from 'react-router-dom';
import { CardDeck, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';

interface IProps {}

interface IPropsGlobal {
    players: IPlayer [];
}


const ViewPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps <{ playerId: string }>> = props => {

    const id = props.match.params.playerId;
 
    const player = props.players.find(u => u.id_player === id);

    return (
        <div>
            {player !== null  && player !== undefined && (
            <CardDeck >
           
                <Card style={{display: 'flex', flexDirection: 'row'}}>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <Card.Title>{u.username}</Card.Title>
                        <Card.Text>
                            {u.city}
                        </Card.Text>
                        <Card.Text>
                            {u.genre}
                        </Card.Text>
                        <Card.Text>
                            {u.rating}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
              
            </CardDeck>
             )}
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players

  });

//   const mapDispachToProps = {
//     setPlayers: actions.setPlayers
//   }
  
  export default connect(
    mapStateToProps
  )(ViewPlayer);