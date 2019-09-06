import React from 'react';
import { Card, DropdownButton, Form, Col, Button } from 'react-bootstrap';
import { IPlayer } from '../interfaceIPlayer';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { RouteComponentProps } from 'react-router-dom';
import { IFriendship } from '../interfaceIFriendship';
import { INotifications } from '../interfaceINotifications';


interface Iprops { }

interface IpropsGlobal {
    token: string;
    setFriendships: (friendships: IFriendship[]) => void;
    friendships: IFriendship[];
    deleteFriendship: (id_friendship: number) => void;
    player: IPlayer;
    setNotifications: (notification: INotifications) => void;
};

const FriendRequests: React.FC<Iprops & IpropsGlobal & RouteComponentProps> = props => {
    const [error, setError] = React.useState("");
    // const [errorRating, setErrorRating] = React.useState("");
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
            // setErrorRating("");
        } else {
            // setErrorRating("Rango no permitido");
        }
    };

    const UpdateRatingToF = (event: any) => {

        if (inputRatingFrom <= event.target.value) {
            setInputRatingTo(event.target.value);
            // setErrorRating("");
        } else {
            // setErrorRating("Rango no permitido");
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
                                        setError("No tienes peticiones de amistad pendiendes.");
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
    React.useEffect(list, []);

    let friends: IFriendship[] = myFriends;

    const amigos = () => {
        let decoded: any = jwt.decode(props.token);
        if (!decoded) {
            console.log("ha fallado el decode");
        }
        else {
            friends = props.friendships.filter(f => !f.accepted && f.id_player2 === decoded.id_player);

            if (friends.length === 0) {
                console.log("null")
                setError("No tienes peticiones de amistad.")
                setMyFriends(friends);
                setFriendsFiltros(friends)
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
        }
    };

    React.useEffect(amigos, [props.friendships]);

    //meterlo tanto en aceptar como en borrar
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

                                } else {
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

    const acceptedFriendship = (id_friend: number) => {
        let decoded: any = jwt.decode(props.token);
        console.log(decoded);
        // const id: number = +props.match.params.id_player;
        // if (decoded !== null && (id === decoded.id_player || props.player.isAdmin)) {
        if (decoded !== null) {

            console.log(decoded);

            console.log("entra al fetch");
            console.log("Soy admin: " + props.player.isAdmin);
            fetch("http://localhost:8080/api//friends/accepted/" + id_friend, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
                // body: JSON.stringify({
                //     id_player_friend: id
                // })
            })
                .then(response => {
                    if (response.ok) {
                        ////habira que ver si es correcto o no
                        console.log("amistad creada");
                        //actualizo mis notificaciones
                        updatednotificationsFriendship();
                        amigos();
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
                                                props.history.push("/friendRequests");

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
                                console.log("la consulta no fue bien. " + err);
                                // setError(" Error al añadir como amigo.");
                            });
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




    const borrarFriend = (id_friend: number) => {
        try {
            if (props.token) {
                let decoded: any = jwt.decode(props.token);
                // const id: number = +props.match.params.id_player;
                // if (decoded !== null && (id !== decoded.id_player || props.player.isAdmin)) {
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
                            props.deleteFriendship(id_friend);
                            //actualizo mis notificaciones
                            updatednotificationsFriendship();
                            props.history.push("/friendRequests");

                            // } else {
                            //     console.log("no deberia entrar aqui, o eres admin o te borras a ti.")
                            // }
                        } else {
                            console.log("error en response.ok")
                        }
                    }).catch(err => {
                        console.log("la consulta no fue bien. " + err);
                        // setError(" Error al borrar como amigo.");
                    });
                // } else {
                //     console.log("ha fallado el decode")
                // }
            } else {
                console.log("no hay token en redux");
            }
        } catch (err) {
            console.log("ha fallado el decode");
        }

    }

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

    React.useEffect(filtar, [inputUsername, inputCity, inputRatingFrom, inputRatingTo, inputSex]);


    if (!friends || !myFriends || !friendsFiltros) {
        console.log("null")
        setError("Tu lista de peticiones de amigos esta vacia.")
        return null;
    }


    return (
        <div className="container-fluid">
            <div className="row">
            {/* {friendsFiltros.length > 0 &&  */}
                <div className="col-2 containerBuscador">
                    <div className="buscador">
                        {/* <div className="barraFiltros" style={{ display: 'flex', flexDirection: 'row' }}> */}

                        {/* <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="idUsername" placeholder="username" onChange={UpdateUsername} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="idCity" placeholder="City" onChange={UpdateCity} />
                        </div>
                    </div> */}

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
                            {/* {errorRating &&
                                <Form.Text>{errorRating}</Form.Text>
                            } */}
                        </DropdownButton>

                    </div>
                </div>
                 {/* <CardDeck > */}
                        {/* } */}
                <div className="col-sm">
                    {friendsFiltros && friendsFiltros.map(f => (
                        // <div className="cardsJugadores" key={f.id_player}>
                        <div className="containerListFriendshipRequest" key={f.id_player}>
                            {/* <Card style={{ display: 'flex', flexDirection: 'row' }}> */}
                            {/* <Card className="cardListPlayer"> */}
                            <Card className="cardHorizontRequest"  style={{ display: 'flex', flexDirection: 'row' }}>
                                <Card.Img className="avatarListProfile" variant="top"
                                    src={f.avatar ? "http://localhost:8080/uploads/avatar/" + f.avatar + "?" + Date() :
                                        "images/avatar-tenis.png"} alt="" />
                                <Card.Body className="cardBodyListPlayer" >
                                    {/* <Link to={"/players/" + f.id_player} > */}
                                    <Card.Title className="cardTitleListPlayer text-capitalize">
                                        {f.username.toLocaleLowerCase()}
                                    </Card.Title>
                                    {props.player.isAdmin &&
                                    <Card.Text className="cardTextListPlayer">
                                        {f.email}
                                    </Card.Text >
                                    }
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
                                        {/* Level {p.rating} */}
                                    </Card.Text>

                                    {/* </Link> */}
                                </Card.Body>
                                <Card.Footer className="cardFooterFriendsRequest">

                                    <div className="container-fluid">
                                        <div className="row">
                                            
                                        <Button className="buttonForm" variant="primary" onClick={() => acceptedFriendship(f.id_friends)}>Aceptar</Button>
                                            
                                        </div>
                                        <br /><br />
                                        <div className="row">
                                        <Button className="buttonForm" variant="primary" onClick={() => borrarFriend(f.id_friends)}>Cancelar</Button>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                     
                                    <Button className="buttonForm" variant="primary" onClick={() => borrarFriend(f.id_friends)}>Cancelar</Button>
                                  
                                    <Button className="buttonForm" variant="primary" onClick={() => acceptedFriendship(f.id_friends)}>Aceptar</Button>
                                
                                    </div> */}

                                </Card.Footer>

                                {/* </Card> */}
                            </Card>
                            <br />
                        </div>
                    ))}
                   
                    {/* </CardDeck> */}
                    {error &&
                     <div className="containerListCardPlayer">
                        <p className="errorListPlayerOrFriendOrRequest" id="errorListPlayerOrFriendOrRequest">{error}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    friendships: state.friendships,
    player: state.player

});

const mapDispachToProps = {
    setFriendships: actions.setFriendships,
    deleteFriendship: actions.deleteFriendship,
    setNotifications: actions.setNotifications
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(FriendRequests);