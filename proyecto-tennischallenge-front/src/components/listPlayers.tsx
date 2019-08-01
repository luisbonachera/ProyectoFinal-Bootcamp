import React from 'react';
import { CardDeck, Card, DropdownButton, Form, Col } from 'react-bootstrap';
import { IPlayer } from '../interfaceIPlayer';
import { IGlobalState } from '../reducers/reducers';
import { connect} from 'react-redux';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';


interface Iprops { }

interface IpropsGlobal {
    token: string;
    players: IPlayer[];
    setPlayers: (players: IPlayer[]) => void;
}
const ListPlayers: React.FC<Iprops & IpropsGlobal> = props => {
    const [error, setError] = React.useState("");
    const [errorRating, setErrorRating] = React.useState("");
    const [inputUsername, setInputUsername] = React.useState("");
    const [inputCity, setInputCity] = React.useState("");
    const [inputSex, setInputSex] = React.useState("");
    const [inputRatingFrom, setInputRatingFrom] = React.useState("");
    const [inputRatingTo, setInputRatingTo] = React.useState("");


    const UpdateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputUsername(event.target.value);
        setError("");
    };

    const UpdateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCity(event.target.value);
        setError("");
    };

    const UpdateRatingFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputRatingFrom(event.target.value);
        // if(inputRatingTo && event.target.value >= inputRatingTo){
        //     setInputRatingFrom(event.target.value);
        //     setErrorRating("");
        // }else{
        //     setErrorRating("Rango no permitido");
        // }
    };

    const UpdateRatingTo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputRatingTo(event.target.value);
        // if(inputRatingFrom && inputRatingFrom <= event.target.value){
        //     setInputRatingTo(event.target.value);
        //     setErrorRating("");
        // }else{
        //     setErrorRating("Rango no permitido");
        // }
        
    };

    
    const listFilter = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            console.log("hola " + inputCity);
            if (decoded !== null) {
                console.log(decoded);
                console.log(inputCity);

                fetch("http://localhost:8080/api/playersFilter", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: "Bearer " + props.token
                    },
                    body: JSON.stringify({         
                        city: "Ronda"
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(response.ok);
                            response
                                .json()
                                .then((lista: IPlayer[]) => {
                                    console.log(lista);
                                    console.log("va bien");
                                    props.setPlayers(lista);
                                    console.log(lista);
                                })
                                .catch(err => {
                                    setError("Error en el json. " + err);
                                });
                        } else {
                            setError("responde.ok da error.");
                        }
                    })
                    .catch(err => {
                        setError("Error en response."+ err);
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
    
    const list = () => {
        if (props.token) {
            let decoded = jwt.decode(props.token);
            if (decoded !== null) {
                console.log(decoded);

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
                                    console.log(lista);
                                    console.log("va bien");
                                    props.setPlayers(lista);
                                    console.log(lista);
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

    // console.log(error);
    React.useEffect(list, []);
    if (props.players.length === 0) {
        return null;
    }

    return (
        <div>


            {/* {props.players.map(u =>
                <div className="row">
                    <div className="card col-3 bg-primary"  style={{width:"300px"}} >
                        <Link key={u.id_player} to={"/players/" + u.id_player} >    
                        <img className="card-img-top" src="/images/avatar-tenis.png" alt="Card image de tenista" />
                        </Link>
                        <div className="card-body text-center">
                            <p className="card-text">{u.username}</p>
                        </div>
                    </div>
                </div>
            )} */}
            <div className="container">
                <div className="barraFiltros" style={{ display: 'flex', flexDirection: 'row' }}>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="idUsername" placeholder="username" onChange={UpdateUsername}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="idCity" placeholder="City" onChange={UpdateCity}/>
                        </div>
                    </div>

                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                        {/* <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked /> */}
                        <label className="form-check-label" >
                            Hombre
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                        <label className="form-check-label" >
                            Mujer
                        </label>
                    </div>

                    <DropdownButton id="dropdown-basic-button" title="Nivel">

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Desde</Form.Label>
                            <Form.Control as="select" onClick={UpdateRatingFrom}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Hasta</Form.Label>
                            <Form.Control as="select" onClick={UpdateRatingTo}>

                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Control>
                        </Form.Group>
                        {errorRating && 
                        <Form.Text>{errorRating}</Form.Text>
                        }
                    </DropdownButton>


                    

                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="button" className="btn btn-primary" onClick={listFilter}>Filtrar</button>
                        </div>
                    </div>
                </div>
                <CardDeck >
                    {props.players.map(u =>
                        <Link key={u.id_player} to={"/players/" + u.id_player} >
                            {/* <Card style={{ display: 'flex', flexDirection: 'row' }}> */}
                            <Card >

                                <Card.Img variant="top" src="/public/images/avatar-tenis.png" />
                                <Card.Body >
                                    <Card.Title>{u.username}</Card.Title>
                                    <Card.Text>
                                        {u.city}
                                    </Card.Text>
                                    <Card.Text>
                                        {u.genre}
                                    </Card.Text>
                                    <Card.Text>
                                        {u.rating}
                                    </Card.Text>

                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>

                            </Card>
                            <br />

                        </Link>
                    )}
                </CardDeck>
            </div>

        </div>
    )
};



const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players

});

const mapDispachToProps = {
    setPlayers: actions.setPlayers
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListPlayers);