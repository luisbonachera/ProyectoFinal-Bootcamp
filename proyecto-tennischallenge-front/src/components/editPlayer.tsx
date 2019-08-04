import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import * as actions from '../actions/actions';
// import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';


interface IProps { }

interface IPropsGlobal {
    player: IPlayer;
    setPlayer: (player: IPlayer) => void;
    // players: IPlayer[];
    token: string;
}

const EditPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState(props.player.username);
    const [email, setEmail] = React.useState(props.player.email);
    // const [password, setPassword] = React.useState("");
    const [city, setCity] = React.useState(props.player.city);
    const [genre, setGenre] = React.useState(props.player.genre);
    const [rating, setRating] = React.useState(props.player.rating);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(props.player.isAdmin);

    const updateUsername = (event: any) => {
        setUsername(event.currentTarget.value);
        // setError("");
    };

    const updateEmail = (event: any) => {
        setEmail(event.currentTarget.value);
        // setError("");
    };

    // const updatePassword = (event: any) => {
    //     setPassword(event.currentTarget.value);
    //     // setError("");
    // };
    const updateCity = (event: any) => {
        setCity(event.currentTarget.value);
        // setError("");
    };

    const updateGenre = (event: any) => {
        setGenre(event.currentTarget.value);
        // setError("");
    };

    const updateRating = (event: any) => {
        setRating(event.currentTarget.value);
        // setError("");
    };

    const updateIsAdmin = (event: any) => {
        setIsAdmin(s => !s);
        // setError("");
    };

    const edit = () => {
        if (props.token) {
            let decoded: any = jwt.decode(props.token);
            const id:number = +props.match.params.id_player;
            if (decoded !== null && (id === decoded.id_player || decoded.isAdmid === true)) {
                console.log(decoded);

                console.log("entra al fetch");
                console.log(isAdmin);
                fetch("http://localhost:8080/api/players/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    },
                    body: JSON.stringify({
                        username: username,
                        email: email,
                        // password: password,
                        city: city,
                        genre: genre,
                        rating: rating,
                        isAdmin: isAdmin,
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("usuario creado")
                            props.history.push("/profile/"+ id);

                            const us :IPlayer = {
                                id_player: id,
                                username: username,
                                email: email,
                                // password: password,
                                city: city,
                                genre: genre,
                                rating: rating,
                                isAdmin: isAdmin,
                            }
                            console.log(us);
                            props.setPlayer(us);
                            // props.history.push("/");
                            // fetch("http://localhost:8080/api/auth", {
                            //     method: "post",
                            //     headers: {
                            //         "Content-Type": "application/json"
                            //     },
                            //     body: JSON.stringify({
                            //         username: username,
                            //         password: props.player.password
                            //     })
                            // })
                            //     .then(response => {
                            //         if (response.ok) {
                            //             response
                            //                 .text()
                            //                 .then((token: string) => {
                            //                     props.setToken(token);
                            //                     // const token_decoded: any = jwt.decode(token);
                            //                     // console.log(token_decoded);
                            //                     // if (token_decoded !== null && typeof token_decoded !== "string") {
                            //                     //     props.setUser(token_decoded);

                            //                     // }
                            //                     props.history.push("/")

                            //                 })

                            //         } else {
                            //             setError("Usuario o Contraseña incorrectos ," + error );
                            //             console.log(error);
                            //         }
                            //     })
                            //     .catch(error => {
                            //         setError("Usuario o Contraseña incorrectos ,"+ error );
                            //         console.log(error);
                            //     });
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
            <Form>
                <Form.Row>
                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter username" onChange={updateUsername} defaultValue={props.player.username} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={updateEmail} defaultValue={props.player.email} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    {/* <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={updatePassword} />
                    </Form.Group> */}


                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" onChange={updateCity} defaultValue={props.player.city} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" placeholder="Enter genre" onChange={updateGenre} value={props.player.genre} />
                    </Form.Group>

                    {/* <Form.Group as={Col} controlId="formGridRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" placeholder="Enter rating" onChange={updateRating} />
                    </Form.Group> */}
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Desde</Form.Label>
                        <Form.Control as="select" defaultValue={props.player.rating + ""} onChange={updateRating}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Control>
                    </Form.Group>


                </Form.Row>
                {/* <Form.Row>
                    <Form.Group as={Col} controlId="formGridDay">
                        <Form.Label>Day</Form.Label>
                        <Form.Control type="text" placeholder="Enter day" onChange={updateGenre} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMonth">
                        <Form.Label>Month</Form.Label>
                        <Form.Control type="number" placeholder="Enter month" onChange={updateRating} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" placeholder="Enter year" onChange={updateRating} />
                    </Form.Group>


                </Form.Row> */}
                {props.player.isAdmin === true && (
                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Administrador" onChange={updateIsAdmin} defaultChecked={props.player.isAdmin}/>
                    </Form.Group>
                )}
                <Button variant="primary" type="button" onClick={edit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    // players: state.players,
    player: state.player

});

const mapDispachToProps = {
    setToken: actions.setToken,
    setPlayer: actions.setPlayer
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(EditPlayer);