import React, { Fragment } from 'react';
import { IPlayer } from '../interfaceIPlayer';
import { RouteComponentProps, Link } from 'react-router-dom';
import { CardDeck, Card, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import jwt from 'jsonwebtoken';
import * as actions from '../actions/actions';
import { IFriendship } from '../interfaceIFriendship';
import { INotifications } from '../interfaceINotifications';

interface IProps { }

interface IPropsGlobal {
    players: IPlayer[];
    player: IPlayer;
    token: string;
    setToken: (token: string) => void;
    deletePlayer: (id_player: number) => void;
    setFriendships: (friendships: IFriendship[]) => void;
    friendships: IFriendship[];
    setYourFriendships: (friendships: IFriendship[]) => void;
    yourFriendships: IFriendship[];
    deleteFriendship: (id_friendship: number) => void;
    notifications: INotifications;
}

const ViewPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {

    const initialStatePlayer: IPlayer = {
        id_player: 0,
        avatar: "",
        username: "",
        email: "",
        city: "",
        genre: "",
        rating: 0,
        isAdmin: false
    };

    const [thisplayer, setThisPlayer] = React.useState<IPlayer>(initialStatePlayer);
    const [stateFriend, setStateFriend] = React.useState("");
    const [id_friend, setId_friend] = React.useState(0);

    const id = props.match.params.id_player;

    const amistad = () => {
        let decoded: any = jwt.decode(props.token);
        const id: number = +props.match.params.id_player;
        if (decoded !== null) {
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
                                                props.setFriendships(listaFriendship);
                                                props.deleteFriendship(id);
                                                props.history.push("/players");

                                            } else {
                                                // console.log("la BD no ha devuelto ningun mensaje.");
                                            }
                                        })
                                        .catch(err => {
                                            // console.log("error al devolver mis mensajes." + err);
                                        })
                                } else {
                                    // console.log("Error en el response.ok");
                                }
                            })
                            .catch(err => {
                                // setError(" Error al añadir como amigo.");
                            })
                    } else {
                        // console.log("Error en el response.ok");
                    }
                }).catch(err => {
                    // console.log("error en response" + err);
                })
        } else {
            // console.log("Error en el decoded");
        }
    }

    const borrarFriend = () => {
        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id: number = +props.match.params.id_player;
            if (decoded !== null && (id !== decoded.id_player || props.player.isAdmin)) {
                fetch("http://localhost:8080/api/friends/delete/" + id_friend, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            props.deleteFriendship(id_friend);
                            props.history.push("/friends");
                        } else {
                            // console.log("error en response.ok")
                        }
                    }).catch(err => {
                        // console.log("Error," + err);
                    });
            } else {
                // console.log("ha fallado el decode")
            }
        } else {
            // console.log("no hay token en redux");
        }
    }

    const borrar = () => {

        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id: number = +props.match.params.id_player;
            if (decoded !== null && (id === decoded.id_player || props.player.isAdmin)) {
                fetch("http://localhost:8080/api/players/erased/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            if (props.player.id_player === id) {
                                props.setToken("");
                                /****borrar todo */
                                props.deletePlayer(id);
                                props.deleteFriendship(id_friend);
                                props.history.push("/");
                            } else if (props.player.isAdmin) {
                                props.deletePlayer(id);
                                props.deleteFriendship(id_friend);
                                props.history.push("/players");
                            } else {
                                // console.log("no deberia entrar aqui, o eres admin o te borras a ti.")
                            }
                        } else {
                            // console.log("error en el response.ok");
                        }
                    })
                    .catch(err => {
                        // console.log("Error," + err);
                    })
            }
            else {
                // console.log("El token no se pudo decodificar");
            }
        }
        else {
            // console.log("El token no existe");
        }
    };

    const findThisPlayer = () => {
        let player: any = props.players.find(p => p.id_player === +id);

        if (player) {
            setThisPlayer(player);
            //Funcion que trae de BD los amigos de este player, no los mios
            // y los guarda en redux
            list();
            // eslint-disable-next-line
            props.friendships.map(f => {
                if ((f.id_player1 === player.id_player && f.id_player2 === props.player.id_player) ||
                    (f.id_player2 === player.id_player && f.id_player1 === props.player.id_player)) {
                    if (f.accepted) {
                        setStateFriend("amigo");
                        setId_friend(f.id_friends);
                    } else if (!f.accepted) {
                        if (f.id_player1 === player.id_player) {
                            setStateFriend("responderPeticion");
                            setId_friend(f.id_friends);
                        } else if (f.id_player1 === props.player.id_player) {
                            setStateFriend("EsperandoPeticion");
                            setId_friend(f.id_friends);
                        } else {
                            setStateFriend("");
                            setId_friend(f.id_friends);
                        }
                    }
                } else {
                    // console.log("aqui no deberia entrar")
                }
            });
        } else {
            // console.log("este usuario no es tu amigo")
        }
    };
    React.useEffect(findThisPlayer, [props.match.params.id_player, props.friendships]);

    const list = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                fetch("http://localhost:8080/api/friends/" + id, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            response
                                .json()
                                .then((lista: IFriendship[]) => {
                                    if (lista.length === 0) {
                                        props.setYourFriendships([]);
                                    }
                                    else {
                                        props.setYourFriendships(lista);
                                    }
                                })
                                .catch(err => {
                                    // console.log("Error en el json.");
                                });
                        } else {
                            // console.log("responde.ok da error.");
                        }
                    })
                    .catch(err => {
                        // console.log("Error en response.");
                    });
            }
            else {
                // console.log("El token no se pudo decodificar");
            }
        }
        else {
            // console.log("El token no existe");
        }
    };
    React.useEffect(list, [props.players, props.match.params.id_player]);

    return (
        <Fragment>
            {thisplayer !== null && thisplayer !== undefined && (
                <Fragment>
                    <CardDeck className="cardHorizont ">
                        <Card className="cardProfileViewPlayer" style={{ display: 'flex', flexDirection: 'row' }}>
                            <Card.Img className="avatarListProfile" variant="top"
                                src={thisplayer.avatar ? "http://localhost:8080/uploads/avatar/" + thisplayer.avatar + "?" + (new Date()).valueOf() :
                                    "../../images/avatar-tenis.png"} alt="" />
                            <Card.Body>
                                <Card.Title className="text-capitalize">
                                    {thisplayer.username.toLocaleLowerCase()}
                                </Card.Title>
                                {props.player.isAdmin &&
                                    <Card.Text>
                                        {thisplayer.email}
                                    </Card.Text>
                                }
                                <Card.Text className="text-capitalize">
                                    {thisplayer.city.toLocaleLowerCase()}
                                </Card.Text>
                                <Card.Text className="containerTextGenreAndIcon">
                                    <img src={thisplayer.genre === "HOMBRE" ? "../../images/hombre30.png" : "../../images/mujer.png"} width="15" height="15" alt="" />
                                    <span className="text-capitalize">{thisplayer.genre.toLocaleLowerCase()}</span>
                                </Card.Text>
                                <Card.Text>
                                    {thisplayer.rating > 0 &&
                                        <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                    }
                                    {thisplayer.rating > 1 &&
                                        <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                    }
                                    {thisplayer.rating > 2 &&
                                        <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                    }
                                    {thisplayer.rating > 3 &&
                                        <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                    }
                                    {thisplayer.rating > 4 &&
                                        <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                    }
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer >
                                <div className="row">
                                    <div className="col">
                                        <Link to={"/mailTray/add/" + thisplayer.id_player}>
                                            <Button className="buttonForm" variant="primary">Enviar Mensaje</Button>
                                        </Link>
                                    </div>
                                    {props.player.isAdmin &&
                                        <div className="col-4">
                                            <Link to={"/players/edit/" + thisplayer.id_player}>
                                                {/* {console.log(thisplayer.id_player)} */}
                                                <Button className="buttonForm" variant="primary">Editar</Button>                                        </Link>
                                        </div>
                                    }
                                </div>
                                <br />
                                <br />
                                <div className="row">
                                    <div className="col">
                                        {stateFriend === "amigo" &&
                                            <Fragment>
                                                <Button className="buttonForm" variant="primary" onClick={borrarFriend}>Eliminar Amigo</Button>
                                                <br />
                                                <br />
                                            </Fragment>
                                        }
                                        {stateFriend === "responderPeticion" &&
                                            <Fragment>
                                                <Button className="buttonForm" variant="primary" disabled>Responder Amistad</Button>
                                                <br />
                                                <br />
                                            </Fragment>
                                        }
                                        {stateFriend === "EsperandoPeticion" &&
                                            <Fragment>
                                                <Button className="buttonForm" variant="primary" disabled>Esperando Amistad</Button>
                                                <br />
                                                <br />
                                            </Fragment>
                                        }
                                        {stateFriend === "" && props.player.id_player !== +id &&
                                            <Fragment>
                                                <Button className="buttonForm" variant="primary" onClick={amistad}>Solicitar Amistad</Button>
                                                <br />
                                                <br />
                                            </Fragment>
                                        }
                                    </div>
                                    {props.player.isAdmin &&
                                        <div className="col-4">
                                            <Button className="buttonForm" variant="primary" onClick={borrar}>Borrar</Button>
                                        </div>
                                    }
                                </div>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                    <div className="col-sm containerListCardPlayer">
                        {props.yourFriendships && props.yourFriendships.map(f => (
                            <div className="cardsJugadores" key={f.id_player}>
                                <Card className="cardListPlayer">
                                    <Card.Img className="avatarListProfile" variant="top"
                                        src={f.avatar ? "http://localhost:8080/uploads/avatar/" + f.avatar + "?" + Date() :
                                            "/images/avatar-tenis.png"} alt="" />
                                    <Card.Body className="cardBodyListPlayer" >
                                        <Link to={"/players/" + f.id_player} >
                                            <Card.Title className="cardTitleListPlayer">
                                                {f.username}
                                            </Card.Title>
                                            <Card.Text className="cardTextListPlayer">
                                                {f.city}
                                            </Card.Text >
                                            <Card.Text className="cardTextListPlayer containerTextGenreAndIcon">
                                                <img src={f.genre === "HOMBRE" ? "/images/hombre30.png" : "/images/mujer.png"} width="15" height="15" alt="" />
                                                <span className="text-capitalize">{f.genre.toLowerCase()}</span>
                                            </Card.Text >
                                            <Card.Text className="cardTextListPlayer">
                                                {f.rating > 0 &&
                                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                                }
                                                {f.rating > 1 &&
                                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                                }
                                                {f.rating > 2 &&
                                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                                }
                                                {f.rating > 3 &&
                                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                                }
                                                {f.rating > 4 &&
                                                    <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                                }
                                            </Card.Text>
                                        </Link>
                                    </Card.Body>
                                </Card>
                                <br />
                            </div>
                        ))}
                        {props.yourFriendships.length === 0 &&
                            <Form.Text className="errorListPlayerOrFriendOrRequest">No tiene ningún amigo</Form.Text>
                        }
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players,
    player: state.player,
    friendships: state.friendships,
    yourFriendships: state.yourFriendships,
    notifications: state.notifications
});

const mapDispachToProps = {
    setToken: actions.setToken,
    deletePlayer: actions.deletePlayer,
    setFriendships: actions.setFriendships,
    deleteFriendship: actions.deleteFriendship,
    setYourFriendships: actions.setYourFriendships
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ViewPlayer);