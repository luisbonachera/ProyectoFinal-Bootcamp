import React from 'react';
import { IPlayer } from '../interfaceIPlayer';
import { RouteComponentProps, Link } from 'react-router-dom';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import jwt from 'jsonwebtoken';
import { setToken } from '../actions/actions';
import * as actions from '../actions/actions';

interface IProps { }

interface IPropsGlobal {
    players: IPlayer[];
    player: IPlayer;
    token: string;
    setToken: (token: string) => void;
    deletePlayer: (id_player: number) => void;
}


const ViewPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {
    const [error, setError] = React.useState("");

    const id = props.match.params.id_player;
    console.log(id);

    console.log(props.players);


    const player = props.players.find(p => p.id_player === +id);
    console.log(player);




    const borrar = () => {

        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id:number = +props.match.params.id_player;
            if (decoded !== null && (id === decoded.id_player || props.player.isAdmin)) {
                console.log(decoded);

                console.log("entra al fetch");
                console.log("Soy admin: " + props.player.isAdmin);
                fetch("http://localhost:8080/api/players/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("usuario borrado")
                            if(props.player.id_player === id){
                                props.setToken("");
                                props.history.push("/");
                                props.deletePlayer(id);
                            }else if (props.player.isAdmin){
                                props.history.push("/players");
                                props.deletePlayer(id);
                            }else{
                                console.log("no deberia entrar aqui, o eres admin o te borras a ti.")
                            }
                        }else{
                            console.log("error en el response.ok");
                        }
                    })
                    .catch(err => {
                        console.log("Error," + err)
                    })
            }
            else {
                setError("El token no se pudo decodificar");
            }
        }
        else {
            setError("El token no existe");
        }
    };

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
                                <>
                                <Link to={"/players/edit/" + player.id_player}>
                                    <Button variant="primary">Editar</Button>
                                </Link>
                                <Link to={"/players"} onClick={borrar}>
                                    <Button variant="primary">Borrar</Button>
                                </Link>
                                </>
                            )}
                        </Card.Footer>
                    </Card>

                </CardDeck>
            )}
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players,
    player: state.player

});

const mapDispachToProps = {
    setToken: actions.setToken,
    deletePlayer: actions.deletePlayer
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ViewPlayer);