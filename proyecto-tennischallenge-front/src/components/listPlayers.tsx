import React from 'react';
import { Card, DropdownButton, Form, Col } from 'react-bootstrap';
import { IPlayer } from '../interfaceIPlayer';
import { IGlobalState } from '../reducers/reducers';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { IFriendship } from '../interfaceIFriendship';

interface Iprops { }

interface IpropsGlobal {
    token: string;
    players: IPlayer[];
    setPlayers: (players: IPlayer[]) => void;
    setFriendships: (friendships: IFriendship[]) => void;
};

const ListPlayers: React.FC<Iprops & IpropsGlobal> = props => {
    const [error, setError] = React.useState("");
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputCity, setInputCity] = React.useState("");
    const [inputSex, setInputSex] = React.useState("");
    const [inputRatingFrom, setInputRatingFrom] = React.useState(1);
    const [inputRatingTo, setInputRatingTo] = React.useState(5);
    const [filteresList, setFilterestList] = React.useState<IPlayer[]>([]);

    const UpdateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputUsername(event.target.value);
        setError("");
    };

    const UpdateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(event.target.value);
        setError("");
    };

    const UpdateSex = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputSex(event.target.value);
        setError("");
    };

    const UpdateRatingFrom = (event: any) => {

        if (inputRatingTo >= event.target.value) {
            setInputRatingFrom(event.target.value);
        } else {
            // setErrorRating("Rango no permitido");
        }
    };

    const UpdateRatingTo = (event: any) => {

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
                fetch("http://localhost:8080/api/players", {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            response
                                .json()
                                .then((lista: IPlayer[]) => {
                                    if (lista.length === 0) {
                                        setError("No hay jugadores");
                                    } else {
                                        props.setPlayers(lista);
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
                        // setError("Error en response." + err);
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
    React.useEffect(list, []);

    let lista = props.players;

    const filtrar = () => {

        lista = lista.filter(
            p => p.username.toLocaleLowerCase().startsWith(inputUsername.toLocaleLowerCase())
        )
            .filter(p => p.city.toLocaleLowerCase().startsWith(inputCity.toLocaleLowerCase()))
            .filter(p => (p.rating >= inputRatingFrom && p.rating <= inputRatingTo))
            .filter(p => !inputSex || (p.genre === inputSex.toLocaleUpperCase()));

        if (lista.length === 0) {
            setError("No tienes amigos con estos requisitos.");
        } else {
            setError("");
        }
        if (inputUsername) {
            lista.sort(function (a, b) {
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
            lista.sort(function (a, b) {
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
            lista.sort(function (a, b) { return a.rating - b.rating })
        }

        if (inputSex) {
            lista.sort(function (a, b) {
                let genreA = a.genre.toLocaleLowerCase();
                let genreB = b.genre.toLocaleLowerCase();
                if (genreA < genreB) //sort string ascending
                    return -1;
                if (genreA > genreB)
                    return 1;
                return 0; //default return value (no sorting)
            })
        }
        setFilterestList(lista);
    }

    React.useEffect(filtrar, [inputUsername, inputCity, inputRatingFrom, inputRatingTo, inputSex]);

    const listFriendship = () => {
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
                                        // setError("Tu lista de amigos esta vacia");
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
    React.useEffect(listFriendship, []);

    if (!filteresList) {
        return null;
    }

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-2 containerBuscador">
                    <div className="buscador">
                        <div className="form-group">
                            <input type="text" className="form-control" id="idUsername" placeholder="Usuario" onChange={UpdateUsername} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="idCity" placeholder="Ciudad" onChange={UpdateCity} />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Hombre" onChange={UpdateSex} />
                            <label className="form-check-label" >Hombre</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Mujer" onChange={UpdateSex} />
                            <label className="form-check-label" >
                                Mujer
                        </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" onChange={UpdateSex} defaultChecked />
                            <label className="form-check-label" >
                                Ambos
                        </label>
                        </div>
                        <DropdownButton id="dropdown-basic-button" drop='right' title="Nivel">
                            <Form.Group as={Col} id="dropdwnRatingListPlayer" controlId="formGridState">
                                <Form.Label>Desde</Form.Label>
                                <Form.Control as="select" value={inputRatingFrom + ""} onChange={UpdateRatingFrom}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} id="dropdwnRatingListPlayer" controlId="formGridState">
                                <Form.Label>Hasta</Form.Label>
                                <Form.Control as="select" value={inputRatingTo + ""} onChange={UpdateRatingTo}>
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
                <div className="col-sm containerListCardPlayer">
                    {filteresList && filteresList.map(p => (
                        <div className="cardsJugadores" key={p.id_player}>
                            <Card className="cardListPlayer">
                                <Card.Img className="avatarListProfile" variant="top"
                                    src={p.avatar ? "http://localhost:8080/uploads/avatar/" + p.avatar + "?" + (new Date()).valueOf() :
                                        "images/avatar-tenis.png"} alt="" />
                                <Card.Body className="cardBodyListPlayer" >
                                    <Link to={"/players/" + p.id_player} >
                                        <Card.Title className="cardTitleListPlayer text-capitalize">
                                            {p.username.toLocaleLowerCase()}
                                        </Card.Title>
                                        <Card.Text className="cardTextListPlayer text-capitalize">
                                            {p.city.toLocaleLowerCase()}
                                        </Card.Text >
                                        <Card.Text className="cardTextListPlayer containerTextGenreAndIcon">
                                            <img src={p.genre === "HOMBRE" ? "images/hombre30.png" : "images/mujer.png"} width="15" height="15" alt="" />
                                            <span className="text-capitalize">{p.genre.toLocaleLowerCase()}</span>
                                        </Card.Text >
                                        <Card.Text className="cardTextListPlayer">
                                            {p.rating > 0 &&
                                                <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                            }
                                            {p.rating > 1 &&
                                                <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                            }
                                            {p.rating > 2 &&
                                                <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                            }
                                            {p.rating > 3 &&
                                                <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                            }
                                            {p.rating > 4 &&
                                                <i className="material-icons iconRatingTennis md-48">sports_tennis</i>
                                            }
                                        </Card.Text>
                                    </Link>
                                </Card.Body>
                            </Card>
                            <br />
                        </div>
                    ))}
                    {error &&
                        <Form.Text className="errorListPlayerOrFriendOrRequest">{error}</Form.Text>
                    }
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players

});

const mapDispachToProps = {
    setPlayers: actions.setPlayers,
    setFriendships: actions.setFriendships
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListPlayers);