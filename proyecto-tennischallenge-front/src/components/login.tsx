import React from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/actions'
import { RouteComponentProps } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { IPlayer } from '../interfaceIPlayer';
import { IGlobalState } from '../reducers/reducers';

interface IProps { }

interface IPropsGlobal {
    setToken: (token: string) => void;
    setPlayer: (player: IPlayer) => void;
    setPlayers: (players: IPlayer[]) => void;
    token: string;
}

const Login: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {

    const [inputUser, setInputUser] = React.useState("");
    const [inputPass, setInputPass] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorPass, setErrorPass] = React.useState("");
    const [errorUsername, setErrorUsername] = React.useState("");


    const UpdateUser = (event: any) => {
        setInputUser(event.target.value);
        setError("");
        setErrorUsername("");
        // setErrorPass("");
    }

    // const UpdatePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const UpdatePass = (event: any) => {

        setInputPass(event.target.value);
        setError("");
        // setErrorUsername("");
        setErrorPass("");
    }



    const log = () => {
        // let abortController = new AbortController();
        if (inputUser && inputPass) {
            fetch("http://localhost:8080/api/auth", {
                // signal: abortController.signal,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputUser,
                    password: inputPass
                })
            })
                .then(response => {
                    if (response.ok) {
                        // console.log("ok");
                        response
                            .text() //el text()es una promesa
                            .then((token: string) => {
                                if (token) {
                                    // console.log(token);

                                    let decoded: any = jwt.decode(token);
                                    // console.log("decoded:")
                                    // console.log(decoded);
                                    if (decoded) {
                                        let player: IPlayer = {
                                            id_player: decoded.id_player,
                                            avatar: decoded.avatar,
                                            username: decoded.username,
                                            isAdmin: decoded.isAdmin,
                                            email: decoded.email,
                                            city: decoded.city,
                                            genre: decoded.genre,
                                            rating: decoded.rating
                                        }
                                        // console.log("entra");
                                        // console.log(player);

                                        // if (props.token) {
                                        // let decoded = jwt.decode(props.token);
                                        // if (decoded) {
                                        //     console.log(decoded);
                                        // console.log("ahora deberia entrar a listar players")
                                        // abortController.abort();
                                        fetch("http://localhost:8080/api/players", {
                                            headers: {
                                                "Content-type": "application/json",
                                                Authorization: "Bearer " + token
                                            }
                                        })
                                            .then(response => {
                                                if (response.ok) {
                                                    response
                                                        .json()
                                                        .then((lista) => {
                                                            // console.log("va bien");
                                                            // console.log(lista);
                                                            for (let i = 0; i < lista.length; i++) {
                                                                lista[i].isAdmin = (lista[i].isAdmin === '1' ? true : false)
                                                            }
                                                            props.setPlayer(player);
                                                            props.setPlayers(lista);
                                                            props.history.push("/");
                                                            sessionStorage.setItem("token", token);
                                                            props.setToken(token);


                                                        })
                                                        .catch(err => {
                                                            setError("Error en el json.");
                                                        });
                                                } else {
                                                    setError("responde.ok da error.");
                                                }
                                            })
                                            .catch(err => {
                                                setError("Error en response." + err);
                                            });
                                        // }
                                        // else {
                                        //     setError("El token no se pudo decodificar");
                                        // }
                                        // }
                                        // else {
                                        //     setError("El token no existe");
                                        // }

                                    } else {
                                        // console.log("Ha fallado el decode en login");
                                    }

                                } else {
                                    // console.log("la BD no ha devuelto el token vacio.")
                                }

                            });
                    } else {
                        response.json().then(({ e }) => {
                            if (e === 1062) {
                                // console.log(e)
                            }
                            // console.log(e)
                        }).catch(err=> {
                            // console.log(err);
                        })
                        setError("Usuario o Contraseña incorrectos.");
                        setErrorPass("error");
                        setErrorUsername("error");
                        // console.log(error);
                    }
                })
                .catch(err => {
                    setError("Usuario o Contraseña incorrectos. " + err);
                    setErrorPass("error");
                    setErrorUsername("error");
                    // console.log(error);
                });
        } else if (!inputUser && inputPass) {
            setErrorUsername("error");
            setError("Te falta por rellenar el campo usuario");
        } else if (inputUser && !inputPass) {
            setErrorPass("error");
            setError("Te falta por rellenar el campo password");
        } else {
            // console.log("inputUser " + inputUser);
            // console.log("inputPass " + inputPass);
            setErrorPass("error");
            setErrorUsername("error");
            setError("Campos usuario y password estan vacios");
        }
    }

    return (
        <div className="container">
            <div className="login">
                <Form className="FormLogin">
                    <Form.Group as={Row} className="groupUsername" controlId="formGroupUsername">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" className={errorUsername ? "form-control form-control-red" : "form-control"} 
                         as="input" maxLength="12"  placeholder="Escriba su usuario" required onChange={UpdateUser} />
                        {/* <Form.Control type="text" placeholder="Enter username" onChange={UpdateUser} /> */}
                    </Form.Group>
                    <Form.Group as={Row} className="groupPass" controlId="formGroupPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" className={errorPass ? "form-control form-control-red" : "form-control"} 
                         as="input" maxLength="20" placeholder="Escriba su contraseña" required onChange={UpdatePass} />
                        {/* <input type="password" placeholder="Password" onChange={UpdatePass} /> */}
                    </Form.Group>

                    <div className="row">
                        <div className="col">
                            {error && <p className="error">{error}</p>}
                            {!error && <p className="error"></p>}
                        </div>


                    </div>

                    <Form.Group as={Row} className="groupButton" controlId="formGroupButton">
                        {/* <Col sm={{ span: 10, offset: 6 }}> */}


                        <div className="col containerButtonLogin">
                            <Button className="buttonForm" type="button" onClick={log}>Iniciar Sesión</Button>
                        </div>
                        {/* </Col> */}
                        {/* <Col sm={{ span: 10, offset: 6 }}>
                            {error && <p>{error}</p>}
                        </Col> */}

                    </Form.Group>
                    {/* <Form.Group as={Row}>
                       
                        <Col sm={{ span: 10, offset: 6 }}>
                            {error && <p>{error}</p>}
                        </Col>

                    </Form.Group> */}
                </Form>
            </div>
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token
});

const mapDispachToProps = {
    setToken: actions.setToken,
    setPlayer: actions.setPlayer,
    setPlayers: actions.setPlayers
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(Login);

