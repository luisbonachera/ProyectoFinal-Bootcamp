import React, { Fragment } from 'react';
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
    friendships: IFriendship[];
    deleteFriendship: (id_friendship: number) => void;
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

    const [error, setError] = React.useState("");
    const [thisplayer, setThisPlayer] = React.useState<IPlayer>(initialStatePlayer);
    const [stateFriend, setStateFriend] = React.useState("");
    const [id_friend, setId_friend] = React.useState(0);


    const id = props.match.params.id_player;
    console.log(id);

    console.log(props.players);

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
                                                props.deleteFriendship(id);
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

    const borrarFriend = () => {
        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id: number = +props.match.params.id_player;
            if (decoded !== null && (id !== decoded.id_player || props.player.isAdmin)) {
                console.log(decoded);

                console.log("entra al fetch");
                console.log("Soy admin: " + props.player.isAdmin);
                fetch("http://localhost:8080/api/friends/delete/" + id_friend, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("amistad borrada")
                            // if (props.player.id_player === id) {
                            //     props.setToken("");
                            //     props.history.push("/");
                            //     props.deletePlayer(id);
                            // } else if (props.player.isAdmin) {
                            props.history.push("/players");

                            // } else {
                            //     console.log("no deberia entrar aqui, o eres admin o te borras a ti.")
                            // }
                        } else {
                            console.log("error en response.ok")
                        }
                    }).catch(err => {

                    });
            } else {
                console.log("ha fallado el decode")
            }
        } else {
            console.log("no hay token en redux");
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

                                props.deletePlayer(id);
                                props.deleteFriendship(id_friend);
                                props.history.push("/");
                            } else if (props.player.isAdmin) {

                                props.deletePlayer(id);
                                props.deleteFriendship(id_friend);
                                props.history.push("/players");
                            } else {
                                console.log("no deberia entrar aqui, o eres admin o te borras a ti.")
                            }
                        } else {
                            console.log("error en el response.ok");
                        }
                    })
                    .catch(err => {
                        console.log("Error," + err);
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


    const findThisPlayer = () => {
        let player: any = props.players.find(p => p.id_player === +id);
        console.log(player);

        if (player) {
            console.log(player);
            setThisPlayer(player);
            console.log("thisPlayer");
            console.log(thisplayer);
            // let lista = props.friendships.filter(f =>
            //     ((f.id_player1 === player.id_player && f.id_player2 === props.player.id_player) ||
            //         (f.id_player2 === player.id_player && f.id_player1 === props.player.id_player)) &&
            //     (f.accepted));
            //     console.log(lista);
            props.friendships.map(f => {
                if ((f.id_player1 === player.id_player && f.id_player2 === props.player.id_player) ||
                    (f.id_player2 === player.id_player && f.id_player1 === props.player.id_player)) {
                    if (f.accepted) {
                        setStateFriend("amigo");
                        setId_friend(f.id_friends);
                    } else if (!f.accepted) {
                        if (f.id_player1 === player.id_player) {
                            console.log("entra id_player1 es este player, el me envio peticion")
                            setStateFriend("responderPeticion");
                            setId_friend(f.id_friends);
                        } else if (f.id_player1 === props.player.id_player) {
                            console.log("entra id_player1 soy yo, yo envie peticion.")
                            setStateFriend("EsperandoPeticion");
                            setId_friend(f.id_friends);
                        } else {
                            console.log("aqui no deberia de entrar");
                            setStateFriend("");
                            setId_friend(f.id_friends);
                        }
                    }
                } else {
                    console.log("aqui no deberia entrar")
                }

            });
            //     console.log(lista);

            // setMyFriendship(lista);




        } else {
            setError("Aun no existe el player")
            console.log("este usuario no es tu amigo")
        }

    };
    React.useEffect(findThisPlayer, []);

    // const findMyFriend = () => {
    //     let lista = props.friendships.filter(f =>
    //         ((f.id_player1 === thisplayer.id_player && f.id_player2 === props.player.id_player) ||
    //             (f.id_player2 === thisplayer.id_player && f.id_player1 === props.player.id_player)) &&
    //         (f.accepted));
    //         console.log(lista);
    //     setMyFriendship(lista[0]);
    //     console.log("myfriendship");
    //     console.log(myFriendship)
    // }

    // React.useEffect(findMyFriend, [thisplayer]);

    // if(myFriendship){
    //     return null;
    // }

    return (
        <div>
            {thisplayer !== null && thisplayer !== undefined && (
                <CardDeck >

                    <Card style={{ display: 'flex', flexDirection: 'row' }}>
                        <Card.Img className="avatarListProfile" variant="top"
                            src={thisplayer.avatar ? "http://localhost:8080/uploads/avatar/" + thisplayer.avatar + "?" + Date() :
                                "../../images/avatar-tenis.png"} alt="" />
                        <Card.Body>
                            <Card.Title>{thisplayer.username}</Card.Title>
                            {props.player.isAdmin &&
                                <Card.Text>
                                    {thisplayer.email}
                                </Card.Text>
                            }
                            <Card.Text>
                                {thisplayer.city}
                            </Card.Text>
                            <Card.Text>
                                {thisplayer.genre}
                            </Card.Text>
                            <Card.Text>
                                {thisplayer.rating}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer >
                            {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                            <Link to={"/mailTray/add/" + thisplayer.id_player}>
                                <Button variant="primary">Enviar Mensaje</Button>
                            </Link>
                            <br />
                            <br />
                            {/* aqui tengo que poner mi lista de frienship */}
                            {/* {props.friendships.map(f=> 
                ( ({console.log(f)}) &&  
                ( (f.id_player1 === player.id_player && f.id_player2 === props.player.id_player) ||
                (f.id_player2 === player.id_player && f.id_player1 === props.player.id_player) ) 
                
                && (
                  
               (  f.accepted && ( */}
                            {/* {myFriendship && (myFriendship.map(mF => (
                                ((mF.username === thisplayer.username) && ( */}
                            {stateFriend === "amigo" &&
                                <Fragment>
                                    <Button variant="primary" onClick={borrarFriend}>Eliminar Amigo</Button>
                                    <br />
                                    <br />
                                </Fragment>
                            }
                            {/* ))
                                ||
                                ((mF.username !== thisplayer.username) && ( */}
                            {stateFriend === "responderPeticion" &&
                                <Fragment>
                                    <Button variant="primary" disabled>Responder Amistad</Button>
                                    <br />
                                    <br />
                                </Fragment>
                            }
                            {stateFriend === "EsperandoPeticion" &&
                                <Fragment>
                                    <Button variant="primary" disabled>Esperando Amistad</Button>
                                    <br />
                                    <br />
                                </Fragment>
                            }
                            {stateFriend === "" && props.player.id_player !== +id &&
                                <Fragment>
                                    <Button variant="primary" onClick={amistad}>Solicitar Amistad</Button>
                                    <br />
                                    <br />
                                </Fragment>
                            }
                            {/* )
                                )
                            )))} */}

                            {props.player.isAdmin &&
                                <Fragment>
                                    <Link to={"/players/edit/" + thisplayer.id_player}>
                                        {console.log(thisplayer.id_player)}
                                        <Button variant="primary">Editar</Button>
                                    </Link>
                                    <br />
                                    <br />
                                    {/* <Link to={"/players"} > */}
                                    <Button variant="primary" onClick={borrar}>Borrar</Button>
                                    <br />
                                    <br />
                                    {/* </Link> */}
                                </Fragment>
                            }
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
    player: state.player,
    friendships: state.friendships

});

const mapDispachToProps = {
    setToken: actions.setToken,
    deletePlayer: actions.deletePlayer,
    setFriendships: actions.setFriendships,
    deleteFriendship: actions.deleteFriendship
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ViewPlayer);