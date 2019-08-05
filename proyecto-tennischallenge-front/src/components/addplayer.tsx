import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';

interface IProps { }

interface IPropsGlobal {
    setToken: (token: string) => void;
    setPlayer: (player: IPlayer) => void;
}

const AddPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [city, setCity] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [rating, setRating] = React.useState(0);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    const updateUsername = (event: any) => {
        setUsername(event.currentTarget.value);
        // setError("");
    };

    const updateEmail = (event: any) => {
        setEmail(event.currentTarget.value);
        // setError("");
    };

    const updatePassword = (event: any) => {
        setPassword(event.currentTarget.value);
        // setError("");
    };
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

    const add = () => {
        console.log("entra al fetch");
        console.log(isAdmin);
        fetch("http://localhost:8080/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                city: city,
                genre: genre,
                rating: rating,
                isAdmin: isAdmin,
            })
        })
            .then(response => {
                if (response.ok) {
                    console.log("usuario creado")
                    fetch("http://localhost:8080/api/auth", {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    })
                        .then(response => {
                            if (response.ok) {
                                response
                                    .text()
                                    .then((token: string) => {
                                        if (token) {
                                            console.log(token);
                                        props.setToken(token);
                                        let decoded: any = jwt.decode(token);
                                        console.log("decoded:")
                                        console.log(decoded);
                                        if(decoded){
                                            let player: IPlayer = {
                                                id_player: decoded.id_player,
                                                username: decoded.username,
                                                isAdmin: decoded.isAdmin,
                                                email: decoded.email,
                                                city: decoded.city,
                                                genre: decoded.genre,
                                                rating: decoded.rating
                                            }
                                            console.log("entra");
                                            console.log(player);
                                            props.setPlayer(player);
                                            props.history.push("/");
                                        }else{
                                            console.log("Ha fallado el decode en login");
                                        }
                                        
                                    } else {
                                        console.log("la BD no ha devuelto el token vacio.")
                                    }

                                    })

                            } else {
                                setError("Usuario o Contraseña incorrectos ," + error );
                                console.log(error);
                            }
                        })
                        .catch(error => {
                            setError("Usuario o Contraseña incorrectos ,"+ error );
                            console.log(error);
                        });
                }
            })
            .catch(err => {
                console.log("Error," + err)
            })
    }

    

    return (
        <div>
            <Form>
                <Form.Row>
                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter username" onChange={updateUsername} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={updateEmail} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={updatePassword} />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city" onChange={updateCity} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control type="text" placeholder="Enter genre" onChange={updateGenre} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" placeholder="Enter rating" onChange={updateRating} />
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
                <Button variant="primary" type="button" onClick={add}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

const mapDispachToProps = {
    setToken: actions.setToken,
    setPlayer: actions.setPlayer
  }
  
  export default connect(
    null,
    mapDispachToProps
  )(AddPlayer);