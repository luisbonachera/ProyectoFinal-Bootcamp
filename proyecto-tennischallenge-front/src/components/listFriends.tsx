import React from 'react';
import { Card, DropdownButton, Form, Col } from 'react-bootstrap';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { IFriendship } from '../interfaceIFriendship';
import { IPlayer } from '../interfaceIPlayer';
import { INotifications } from '../interfaceINotifications';
import styles from '../App.module.css';

interface Iprops { }

interface IpropsGlobal {
    token: string;
    setFriendships: (friendships: IFriendship[]) => void;
    friendships: IFriendship[];
    player: IPlayer;
    players: IPlayer[];
    setNotifications: (notification: INotifications) => void;
    notifications: INotifications;
};

const ListFriends: React.FC<Iprops & IpropsGlobal> = props => {
    const [error, setError] = React.useState("");
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputCity, setInputCity] = React.useState("");
    const [inputSex, setInputSex] = React.useState("");
    const [inputRatingFrom, setInputRatingFrom] = React.useState(1);
    const [inputRatingTo, setInputRatingTo] = React.useState(5);
    const [myFriends, setMyFriends] = React.useState<IFriendship[]>([]);
    const [friendsFiltros, setFriendsFiltros] = React.useState<IFriendship[]>([]);

    const UpdateUsernameF = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputUsername(event.target.value);
        setError("");
    };

    const UpdateCityF = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(event.target.value);
        setError("");
    };

    const UpdateSexF = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSex(event.target.value);
        setError("");
    };

    const UpdateRatingFromF = (event: any) => {

        if (inputRatingTo >= event.target.value) {
            setInputRatingFrom(event.target.value);
        } else {
            // setErrorRating("Rango no permitido");
        }
    };

    const UpdateRatingToF = (event: any) => {

        if (inputRatingFrom <= event.target.value) {
            setInputRatingTo(event.target.value);
        } else {
            // setErrorRating("Rango no permitido");
        }

    };

    const list = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                fetch("http://localhost:8080/api/friends", {
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
                                        setError("Tu lista de amigos esta vacia");
                                    }
                                    else {
                                        setError("");
                                        props.setFriendships(lista);
                                    }
                                })
                                .catch(err => {
                                    // setError("Error en el json.");
                                });
                        } else {
                            // setError("responde.ok da error.");
                        }
                    })
                    .catch(err => {
                        // setError("Error en response.");
                    });
            }
            else {
                // setError("El token no se pudo decodificar");
            }
        }
        else {
            // setError("El token no existe");
        }
    };
    React.useEffect(list, [props.players]);

    let friends: IFriendship[] = myFriends;

    const amigos = () => {
        friends = props.friendships.filter(f => f.accepted);

        if (friends.length === 0) {
            setError("Tu lista de amigos esta vacia.")
        } else {
            setError("");
            setMyFriends(friends);
            setFriendsFiltros(friends)
        }
    };

    React.useEffect(amigos, [props.friendships]);

    const filtar = () => {

        friends = myFriends.filter(
            p => p.username.toLocaleLowerCase().startsWith(inputUsername.toLocaleLowerCase())
        )
            .filter(p => p.city.toLocaleLowerCase().startsWith(inputCity.toLocaleLowerCase()))
            .filter(p => (p.rating >= inputRatingFrom && p.rating <= inputRatingTo))
            .filter(p => !inputSex || (p.genre === inputSex.toLocaleUpperCase()));

        if (friends.length === 0) {
            setError("No tienes amigos con estos requisitos.")
        } else {
            setError("");
        }
        if (inputUsername) {
            friends.sort(function (a, b) {
                let nameA = a.username.toLowerCase();
                let nameB = b.username.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            })
        }

        if (inputCity) {
            friends.sort(function (a, b) {
                let cityA = a.city.toLowerCase();
                let cityB = b.city.toLowerCase();
                if (cityA < cityB) //sort string ascending
                    return -1;
                if (cityA > cityB)
                    return 1;
                return 0; //default return value (no sorting)
            })
        }

        if (inputRatingFrom || inputRatingTo) {
            friends.sort(function (a, b) { return a.rating - b.rating })
        }

        if (inputSex) {
            friends.sort(function (a, b) {
                let genreA = a.genre.toLowerCase();
                let genreB = b.genre.toLowerCase();
                if (genreA < genreB) //sort string ascending
                    return -1;
                if (genreA > genreB)
                    return 1;
                return 0; //default return value (no sorting)
            })
        }
        setFriendsFiltros(friends);
    }

    React.useEffect(filtar, [inputUsername, inputCity, inputRatingFrom, inputRatingTo, inputSex, myFriends]);

    const updatednotificationsFriendship = () => {
        if (props.token) {
            fetch("http://localhost:8080/api/notifications", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
            })
                .then(response => {
                    if (response.ok) {
                        response
                            .json()
                            .then((notifications) => {
                                if (notifications[0]) {
                                    props.setNotifications(notifications[0]);
                                } else {
                                    // console.log("no me actualiza las notificaciones porque notificacion[0] no existe")
                                }
                            })
                            .catch(err => {
                                // console.log("Error en el json. " + err);
                            });
                    } else {
                        // console.log("responde.ok da error.");
                    }
                })
                .catch(err => {
                    // console.log("Error en response. " + err);
                });
        } else {
            // console.log("aun no hay token");
        }
    }

    const watched = (id_player: number) => {
        let decoded: any = jwt.decode(props.token);
        let friend = props.friendships.filter(f => f.id_player2 === id_player && !f.watched && f.accepted && f.id_player1 === decoded.id_player)
        if (friend.length > 0) {
            fetch("http://localhost:8080/api/friends/watched/" + friend[0].id_friends, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
            })
                .then(response => {
                    if (response.ok) {
                        //actualizo mis notificaciones
                        updatednotificationsFriendship();
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
                                // console.log("la consulta no fue bien. ");
                            })
                    } else {
                        // console.log("error en response.ok");
                    }
                })
                .catch(err => {
                    // console.log("error en response " + err);
                })
        } else {
            // console.log("este no es tu amigo nuevo.")
        }
    }

    if (!friends || !myFriends || !friendsFiltros) {
        setError("Tu lista de amigos esta vacia.")
        return null;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2 containerBuscador">
                    <div className="buscador">
                        <div className="form-group">
                            <input type="text" className="form-control" id="idUsername" placeholder="Usuario" onChange={UpdateUsernameF} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="idCity" placeholder="Ciudad" onChange={UpdateCityF} />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Hombre" onChange={UpdateSexF} />
                            <label className="form-check-label" >Hombre</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Mujer" onChange={UpdateSexF} />
                            <label className="form-check-label" >
                                Mujer
                        </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" onChange={UpdateSexF} defaultChecked />
                            <label className="form-check-label" >
                                Ambos
                        </label>
                        </div>
                        <DropdownButton id="dropdown-basic-button" drop='right' title="Nivel">
                            <Form.Group as={Col} id="dropdwnRatingListPlayer" controlId="formGridState">
                                <Form.Label>Desde</Form.Label>
                                <Form.Control as="select" value={inputRatingFrom + ""} onChange={UpdateRatingFromF}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} id="dropdwnRatingListPlayer" controlId="formGridState">
                                <Form.Label>Hasta</Form.Label>
                                <Form.Control as="select" value={inputRatingTo + ""} onChange={UpdateRatingToF}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Form.Control>
                            </Form.Group>
                        </DropdownButton>
                    </div>
                </div>
                {!error &&
                <div className="col-sm containerListCardPlayer">
                    {friendsFiltros && friendsFiltros.map(f => (
                        <div className="cardsJugadores" key={f.id_player}>
                            <Card className="cardListPlayer">
                                <Card.Img className="avatarListProfile"
                                    src={f.avatar ? "http://localhost:8080/uploads/avatar/" + f.avatar + "?" + (new Date()).valueOf() :
                                        "images/avatar-tenis.png"} alt="" />
                                {!f.watched && f.id_player1 === props.player.id_player && f.accepted &&
                                    <Card.ImgOverlay className="containerBadgeNewPlayer" onClick={() => watched(f.id_player)}>
                                        <Card.Img className={styles.newFriend} id="newFriend" src="images/Pelota Luis brochazo.png" alt="" />
                                    </Card.ImgOverlay>
                                }
                                <Card.Body className="cardBodyListPlayer" >
                                    <Link to={"/players/" + f.id_player} onClick={() => watched(f.id_player)} >
                                        <Card.Title className="cardTitleListPlayer text-capitalize">
                                            {f.username.toLocaleLowerCase()}
                                        </Card.Title>
                                        <Card.Text className="cardTextListPlayer text-capitalize">
                                            {f.city.toLocaleLowerCase()}
                                        </Card.Text >
                                        <Card.Text className="cardTextListPlayer containerTextGenreAndIcon">
                                            <img src={f.genre === "HOMBRE" ? "images/hombre30.png" : "images/mujer.png"} width="15" height="15" alt="" />
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
                        </div>
                    ))}
                </div>
                }
                {error &&
                    <div className="col-sm containerListCardPlayer">
                        <Form.Text className="errorListPlayerOrFriendOrRequest">{error}</Form.Text>
                    </div>
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    friendships: state.friendships,
    player: state.player,
    players: state.players,
    notifications: state.notifications

});

const mapDispachToProps = {
    setFriendships: actions.setFriendships,
    setNotifications: actions.setNotifications
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListFriends);