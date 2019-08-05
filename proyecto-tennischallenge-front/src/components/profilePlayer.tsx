import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';

interface IPRopsGlobal {
    players: IPlayer[];
    player: IPlayer;
}

const ProfilePlayer: React.FC<IPRopsGlobal & RouteComponentProps<{ id_player: string }>> = props => {

    // const id = props.match.params.id_player;
    // console.log(id);

    // console.log(props.players);


    // const player = props.players.find(p => p.id_player === +id);
    // console.log(player);

    return(
        <div>

{props.player !== null && props.player !== undefined && (
                <CardDeck >

                    <Card style={{ display: 'flex', flexDirection: 'row' }}>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>{props.player.username}</Card.Title>
                            <Card.Text>
                                {props.player.email}
                            </Card.Text>
                            <Card.Text>
                                {props.player.city}
                            </Card.Text>
                            <Card.Text>
                                {props.player.genre}
                            </Card.Text>
                            <Card.Text>
                                {props.player.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            <small className="text-muted">Last updated 3 mins ago</small>
                             <Link to={"/players/edit/"+props.player.id_player}>
                             <Button variant="primary">Editar</Button>
                                 </Link> 
                        </Card.Footer>
                    </Card>

                </CardDeck>
            )}

        </div>
    )
};

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
)(ProfilePlayer);