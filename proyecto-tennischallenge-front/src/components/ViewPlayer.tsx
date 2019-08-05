import React from 'react';
import { IPlayer } from '../interfaceIPlayer';
import { RouteComponentProps, Link } from 'react-router-dom';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';

interface IProps { }

interface IPropsGlobal {
    players: IPlayer[];
    player: IPlayer;
}


const ViewPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {

    const id = props.match.params.id_player;
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
                             <Link to={"/mailTray/add/" + player.id_player}>
                             <Button variant="primary">Enviar Mensaje</Button>

                                 </Link>
                             {props.player.isAdmin && ( 
                             <Link to={"/players/edit/"+ player.id_player}>
<Button variant="primary">Editar</Button>

                                 </Link>
                             )}
                        </Card.Footer>
                    </Card>

                </CardDeck>
            )}
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    // token: state.token,
    players: state.players,
    player: state.player

});

//   const mapDispachToProps = {
//     setPlayers: actions.setPlayers
//   }

export default connect(
    mapStateToProps
)(ViewPlayer);