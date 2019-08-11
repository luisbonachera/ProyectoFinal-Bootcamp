import React from 'react';
import { IPlayer } from '../interfaceIPlayer';
import { RouteComponentProps, Link } from 'react-router-dom';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import jwt from 'jsonwebtoken';
import * as actions from '../actions/actions';
import { IFriendship } from '../interfaceIFriendship';


interface IProps { }

interface IPropsGlobal {
    players: IPlayer[];
    player: IPlayer;
    token: string;
    setToken: (token: string) => void;
    deletePlayer: (id_player: number) => void;
    setFriendships: (friendships: IFriendship[]) => void;
}


const ViewPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {
    const [error, setError] = React.useState("");

    const id = props.match.params.id_player;
    console.log(id);

    console.log(props.players);


    const player = props.players.find(p => p.id_player === +id);
    console.log(player);




    const amistad = () => {
        let decoded: any = jwt.decode(props.token);
        console.log(decoded);
        const id: number = +props.match.params.id_player;
        // if (decoded !== null && (id === decoded.id_player || props.player.isAdmin)) {
        if (decoded !== null) {

            console.log(decoded);

            console.log("entra al fetch");
            console.log("Soy admin: " + props.player.isAdmin);
            fetch("http://localhost:8080/api/friends/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
                body: JSON.stringify({
                    id_player_friend: id
                })
            })
                .then(response => {
                    if (response.ok) {
                        ////habira que ver si es correcto o no
                        console.log("amistad creada")
                        fetch("http://localhost:8080/api/friends", {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + props.token
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    response
                                        .json()
                                        .then((listaFriendship: IFriendship[]) => {
                                            if (listaFriendship.length > 0) {
                                                console.log(listaFriendship);
                                                props.setFriendships(listaFriendship);
                                                props.history.push("/players");

                                            } else {
                                                console.log("la BD no ha devuelto ningun mensaje.");
                                            }
                                        })
                                        .catch(err => {
                                            console.log("error al devolver mis mensajes." + err);
                                        })
                                } else {
                                    console.log("Error en el response.ok");
                                }



                            })
                            .catch(err => {
                                console.log("la consulta no fue bien. ");
                                // setError(" Error al añadir como amigo.");
                            })
                    } else {
                        console.log("Error en el response.ok");
                    }
                }).catch(err => {
                    console.log("error en response" + err);
                })

        } else {
            console.log("Error en el decoded");
        }
    }

    const borrar = () => {

        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id: number = +props.match.params.id_player;
            if (decoded !== null && (id === decoded.id_player || props.player.isAdmin)) {
                console.log(decoded);

                console.log("entra al fetch");
                console.log("Soy admin: " + props.player.isAdmin);
                fetch("http://localhost:8080/api/players/erased/" + id, {
                    // fetch("http://localhost:8080/api/players/" + id, {
                    // method: "DELETE",
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("usuario borrado")
                            if (props.player.id_player === id) {
                                props.setToken("");
                                props.history.push("/");
                                props.deletePlayer(id);
                            } else if (props.player.isAdmin) {
                                props.history.push("/players");
                                props.deletePlayer(id);
                            } else {
                                console.log("no deberia entrar aqui, o eres admin o te borras a ti.")
                            }
                        } else {
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
                        <Card.Img className="avatarListProfile" variant="top"
                            src={player.avatar ? "http://localhost:8080/uploads/avatar/" + player.avatar : "../../images/avatar-tenis.png"} alt="" />
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

                            <Button variant="primary" onClick={amistad}>Peticion Amistad</Button>


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
    deletePlayer: actions.deletePlayer,
    setFriendships: actions.setFriendships
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ViewPlayer);