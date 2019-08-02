import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
// import jwt from 'jsonwebtoken';
import * as actions from '../actions/actions';
// import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface IProps { }

interface IPropsGlobal {
    // players: IPlayer[];
    setToken: (token: string) => void;
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
                    // const us = {
                    //     // _id: user._id,
                    //     username: username,
                    //     email: email,
                    //     password: password,
                    //     isAdmin: isAdmin,
                    // }
                    // props.updateUser(us);
                    // props.history.push("/");
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
                                        props.setToken(token);
                                        // const token_decoded: any = jwt.decode(token);
                                        // console.log(token_decoded);
                                        // if (token_decoded !== null && typeof token_decoded !== "string") {
                                        //     props.setUser(token_decoded);

                                        // }
                                        props.history.push("/")

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

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Administrador" onChange={updateIsAdmin} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={add}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

const mapDispachToProps = {
    setToken: actions.setToken
  }
  
  export default connect(
    null,
    mapDispachToProps
  )(AddPlayer);