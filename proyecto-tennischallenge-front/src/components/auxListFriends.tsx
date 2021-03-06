import React from 'react';
import { CardDeck, Card, DropdownButton, Form, Col} from 'react-bootstrap';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { IFriendship } from '../interfaceIFriendship';
import { IPlayer } from '../interfaceIPlayer';
import { INotifications } from '../interfaceINotifications';


interface Iprops { }

interface IpropsGlobal {
    token: string;
    setFriendships: (friendships: IFriendship[]) => void;
    friendships: IFriendship[];
    player: IPlayer;
    players: IPlayer[];
    setNotifications: (notification: INotifications) => void;
};

const auxListFriends: React.FC<Iprops & IpropsGlobal> = props => {
    const [error, setError] = React.useState("");
    const [errorRating, setErrorRating] = React.useState("");
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
            setErrorRating("");
        } else {
            setErrorRating("Rango no permitido");
        }
    };

    const UpdateRatingToF = (event: any) => {

        if (inputRatingFrom <= event.target.value) {
            setInputRatingTo(event.target.value);
            setErrorRating("");
        } else {
            setErrorRating("Rango no permitido");
        }

    };

    const list = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                console.log(decoded);

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
                                        console.log("va bien");
                                        props.setFriendships(lista);

                                        console.log("friends desde BD");
                                        console.log(lista);
                                    }
                                    // 
                                })
                                .catch(err => {
                                    setError("Error en el json.");
                                });
                        } else {
                            setError("responde.ok da error.");
                        }
                    })
                    .catch(err => {
                        setError("Error en response.");
                    });
            }
            else {
                setError("El token no se pudo decodificar");
            }
        }
        else {
            setError("El token no existe");
        }
    };
    React.useEffect(list, [props.players]);

    let friends: IFriendship[] = myFriends;

    const amigos = () => {
        friends = props.friendships.filter(f => f.accepted);

        if (friends.length === 0) {
            console.log("null")
            setError("Tu lista de amigos esta vacia.")
            // return null;
        } else {
            setError("");
            setMyFriends(friends);
            console.log("friends primera vez")
            console.log(friends)
            setFriendsFiltros(friends)
            console.log("listafriends primera vez")
            console.log(friends)
        }

        console.log(friends)
    };

    React.useEffect(amigos, [props.friendships]);



    // let listaFriends: IFriendship[] = myFriends;

    const filtar = () => {

        // listaFriends = listaFriends.filter(
        friends = myFriends.filter(
            p => p.username.toLocaleLowerCase().startsWith(inputUsername.toLocaleLowerCase())
            // ).slice(0, 5
        )
            .filter(p => p.city.toLocaleLowerCase().startsWith(inputCity.toLocaleLowerCase()))

            .filter(p => (p.rating >= inputRatingFrom && p.rating <= inputRatingTo))

            .filter(p => !inputSex || (p.genre === inputSex.toLocaleUpperCase()));

        if (friends.length === 0) {
            setError("No tienes amigos con estos requisitos.")
        } else {
            setError("");
        }
        console.log("myFriends");
        console.log(myFriends);
        console.log("listaFriends");
        console.log(friends);


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
        // setMyFriends(listaFriends);
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
                            // .then((notifications: INotifications) => {
                            .then((notifications) => {

                                // console.log(notifications);
                                // console.log(notifications[0]);
                                if (notifications[0]) {
                                    // if (notifications[0].numbers_messages > 0 || 
                                    //   notifications[0].numbers_requestFriend > 0 ||
                                    //   notifications[0].numbers_acceptedFriend > 0) {
                                    console.log("actualizando mis notificaciones");
                                    console.log(notifications);
                                    props.setNotifications(notifications[0]);
                                    // console.log(notifications);
                                    // } else {
                                    //   // console.log("no hay notificaciones");
                                    // }

                                }else{
                                    console.log("no me actualiza las notificaciones porque notificacion[0] no existe")
                                }

                            })
                            .catch(err => {
                                console.log("Error en el json. " + err);
                            });
                    } else {
                        console.log("responde.ok da error.");
                    }
                })
                .catch(err => {
                    console.log("Error en response. " + err);
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

                        console.log("amistad creada");
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
                                                console.log("mi lista deberia de peticiones de amistad tener estar reducida en una")
                                                console.log(listaFriendship);
                                                props.setFriendships(listaFriendship);

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
                        console.log("error en response.ok");
                    }
                })
                .catch(err => {
                    console.log("error en response " + err);
                })
        } else {
            console.log("este no es tu amigo nuevo.")
        }
    }


    if (!friends || !myFriends || !friendsFiltros) {
        console.log("null")
        setError("Tu lista de amigos esta vacia.")
        return null;
    }


    return (
        // <div>
<div className="container-fluid">
            {/* <div className="row"> */}

            <div className="container">
                <div className="barraFiltros" style={{ display: 'flex', flexDirection: 'row' }}>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="idUsername" placeholder="username" onChange={UpdateUsernameF} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="idCity" placeholder="City" onChange={UpdateCityF} />
                        </div>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Hombre" onChange={UpdateSexF} />
                        {/* <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked /> */}
                        <label className="form-check-label" >
                            Hombre
                        </label>
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

                    <DropdownButton id="dropdown-basic-button" title="Nivel">

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Desde</Form.Label>
                            <Form.Control as="select" value={inputRatingFrom + ""} onChange={UpdateRatingFromF}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Hasta</Form.Label>
                            <Form.Control as="select" value={inputRatingTo + ""} onChange={UpdateRatingToF}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Form.Control>
                        </Form.Group>
                        {errorRating &&
                            <Form.Text>{errorRating}</Form.Text>
                        }
                    </DropdownButton>

                </div>

                
                {error &&
                    <div>
                        {error}
                    </div>
                }
                {friendsFiltros &&
                    <CardDeck >
                        {friendsFiltros.map(f => (
                            // {props.players.map(u =>
                            <Link key={f.id_player} to={"/players/" + f.id_player} onClick={() => watched(f.id_player)} >
                                {/* <Card style={{ display: 'flex', flexDirection: 'row' }}> */}
                                <Card>

                                    <Card.Img className="avatarListProfile" variant="top"
                                        src={f.avatar ? "http://localhost:8080/uploads/avatar/" + f.avatar + "?" + Date() : "images/avatar-tenis.png"} alt="" />
                                    {!f.watched && f.id_player1 === props.player.id_player && f.accepted &&
                                        <>
                                            <Card.Img className="avatarListProfile newFriend" variant="top" src="images/Pelota Luis brochazo.png" alt="" height="30px"/>
                                            {/* <Badge pill variant="light">Nuevo</Badge> */}
                                        </>
                                    }
                                    <Card.Body >
                                        <Card.Title>{f.username}</Card.Title>
                                        <Card.Text>
                                            {f.city}
                                        </Card.Text>
                                        <Card.Text>
                                            {f.genre}
                                        </Card.Text>
                                        <Card.Text>
                                            {f.rating}
                                        </Card.Text>

                                    </Card.Body>
                                    {/* <Card.Footer>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </Card.Footer> */}

                                </Card>
                                <br />

                            </Link>
                        ))}
                    </CardDeck>
                }

            </div>
            
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    friendships: state.friendships,
    player: state.player,
    players: state.players

});

const mapDispachToProps = {
    setFriendships: actions.setFriendships,
    setNotifications: actions.setNotifications
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(auxListFriends);