import React from 'react';
import { IPlayer } from '../interfaceIPlayer';
import { RouteComponentProps, Link } from 'react-router-dom';
import { CardDeck, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';

interface IProps { }

interface IPropsGlobal {
    players: IPlayer[];
}


const ViewPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ playerId: string }>> = props => {

    const id = props.match.params.playerId;
    console.log(id);

    console.log(props.players);


    const player = props.players.find(p => p.id_player === +id);
    console.log(player);

    return (
        <div>
            {player !== null && player !== undefined && (
                <CardDeck >

                    <Card style={{ display: 'flex', flexDirection: 'row' }}>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>{player.username}</Card.Title>
                            <Card.Text>
                                {player.city}
                            </Card.Text>
                            <Card.Text>
                                {player.genre}
                            </Card.Text>
                            <Card.Text>
                                {player.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            <small className="text-muted">Last updated 3 mins ago</small>
                             <Link to={"/chat"}><div className="btn btn-primary stretched-link">Enviar Mensaje</div></Link> 
                        </Card.Footer>
                    </Card>

                </CardDeck>
            )}
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    // token: state.token,
    players: state.players

});

//   const mapDispachToProps = {
//     setPlayers: actions.setPlayers
//   }

export default connect(
    mapStateToProps
)(ViewPlayer);