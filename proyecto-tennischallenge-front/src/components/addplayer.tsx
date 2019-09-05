import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';
// import RegExp from 'regex';
// var Regex = require("regex");

interface IProps { }

interface IPropsGlobal {
    setToken: (token: string) => void;
    setPlayer: (player: IPlayer) => void;
    setPlayers: (players: IPlayer[]) => void;
}

const AddPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [city, setCity] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [image, setImage] = React.useState();
    // const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [error, setError] = React.useState("");
    const [errorUsername, setErrorUsername] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState("");
    const [errorCity, setErrorCity] = React.useState("");
    const [errorGenre, setErrorGenre] = React.useState("");
    const [errorRating, setErrorRating] = React.useState("");



    const updateUsername = (event: any) => {
        setUsername(event.currentTarget.value);
        setError("");
        setErrorUsername("");
    };

    const updateEmail = (event: any) => {
        setEmail(event.currentTarget.value);
        setError("");
        setErrorEmail("");
    };

    const updatePassword = (event: any) => {
        setPassword(event.currentTarget.value);
        setError("");
        setErrorPassword("");
    };
    const updateCity = (event: any) => {
        setCity(event.currentTarget.value);
        setError("");
        setErrorCity("");
    };

    const updateGenre = (event: any) => {
        setGenre(event.currentTarget.value);
        setError("");
        setErrorGenre("");
    };

    const updateRating = (event: any) => {
        setRating(event.currentTarget.value);
        setError("");
        setErrorRating("");
    };

    const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.files![0]);
    };

    // const updateIsAdmin = (event: any) => {
    //     setIsAdmin(s => !s);
    //     // setError("");
    // };

    const validEmailRegex = new RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
    );

    const validateEmail = (e: string) => validEmailRegex.test(e); //emailvalue es el valor de mi hook para el email, que recojo del onchange del inpu

    const validateCity = //eslint-disable-line
        /^([a-zA-Z' ]+)$/.test(city);

    const validateUsername = //eslint-disable-line
        /^([a-zA-Z0-9' ]+)$/.test(username);

    const mediumRegex = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))((?=.*[a-z])(?=.*[0-9]))((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})" //eslint-disable-line
    );
    const validatePassword = mediumRegex.test(password);

    const add = () => {
        console.log("entra al add");
        // console.log(isAdmin);
        ///requerir campos*********************************************************************
        if (username && password && email && city && genre && rating) {
            // if(validateUsername && validateEmail && validateCity) {
            if (validateEmail && validateCity && validateUsername && validatePassword) {
                console.log("entra al fetch");
                const formData = new FormData();
                if (image) {
                    formData.append("file", image);
                } else {
                    formData.append("file", "");
                }
                formData.append("id_player", "");
                formData.append("username", username);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("city", city);
                formData.append("genre", genre);
                formData.append("rating", rating);

                fetch("http://localhost:8080/api/add", {
                    method: "POST",
                    headers: {
                        // "Content-Type": "application/json"
                    },
                    body: formData
                    // body: JSON.stringify({
                    //     username: username,
                    //     email: email,
                    //     password: password,
                    //     city: city,
                    //     genre: genre,
                    //     rating: rating,
                    //     // isAdmin: isAdmin,
                    // })
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("usuario creado")
                            fetch("http://localhost:8080/api/auth", {
                                method: "POST",
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

                                                    let decoded: any = jwt.decode(token);
                                                    console.log("decoded:")
                                                    console.log(decoded);
                                                    if (decoded) {
                                                        let player: IPlayer = {
                                                            id_player: decoded.id_player,
                                                            avatar: decoded.avatar,
                                                            username: decoded.username,
                                                            isAdmin: decoded.isAdmin,
                                                            email: decoded.email,
                                                            city: decoded.city,
                                                            genre: decoded.genre,
                                                            rating: +decoded.rating
                                                        }

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
                                                                        .then((lista: IPlayer[]) => {
                                                                            console.log("va bien");

                                                                            console.log(lista);
                                                                            props.setPlayer(player);
                                                                            props.setPlayers(lista);
                                                                            props.setToken(token);
                                                                            props.history.push("/");

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


                                                        // console.log("entra");
                                                        // console.log(player);
                                                        // props.setPlayer(player);
                                                        // props.setToken(token);
                                                        // props.history.push("/");

                                                        // const formData = new FormData();
                                                        // formData.append("file", image);
                                                        // formData.append("id", decoded.id_player);

                                                        // fetch("http://localhost:8080/api/addImage/" + decoded.id_player, {
                                                        //     method: "PUT",
                                                        //     headers: {
                                                        //         Authorization: "Bearer " + token
                                                        //     },
                                                        //     body: formData
                                                        // }).then(response => {
                                                        //     if (response.ok) {
                                                        //         response.json().then((player: IPlayer) => {
                                                        //             props.setPlayer(player);
                                                        //             props.setToken(token);
                                                        //             props.history.push("/");
                                                        //         }).catch(err => {
                                                        //             console.log("error al subir la imagen " + err);
                                                        //         });
                                                        //     } else {
                                                        //         console.log("error en el response.ok")
                                                        //     }
                                                        // }).catch(err => {
                                                        //     console.log("error en la consula, error response. " + err);
                                                        // });



                                                        // props.setPlayer(player);
                                                        // props.history.push("/");
                                                    } else {
                                                        console.log("Ha fallado el decode en login");
                                                    }

                                                } else {
                                                    console.log("la BD no ha devuelto el token vacio.");
                                                }

                                            })

                                    } else {
                                        setError("Usuario o Contraseña incorrectos");
                                        console.log("Usuario o Contraseña incorrectos");;
                                    }
                                })
                                .catch(error => {
                                    setError("Usuario o Contraseña incorrectos ," + error);
                                    console.log("Usuario o Contraseña incorrectos" + error);
                                });
                        } else {
                            response.json().then(({ e }) => {
                                console.log(e);
                                console.log(e.sqlMessage)
                                let array = e.sqlMessage.split(" ");
                                array[array.length - 1] = array[array.length - 1].replace("'", "");
                                array[array.length - 1] = array[array.length - 1].replace("'", "");
                                console.log(array);
                                console.log(array[array.length - 1]);
                                let err = array[array.length - 1];
                                if (e.errno === 1062) {
                                    if (err === "email") {
                                        setError("El nombre del email ya existe");
                                        setErrorEmail("error");
                                    } else if (err === "username") {
                                        setError("El nombre del usuario ya existe");
                                        setErrorUsername("error");
                                    }

                                } else {
                                    console.log("no se porque entra aqui")
                                }
                            })
                                .catch(err => {
                                    console.log("Error," + err)
                                });
                        }
                    })
                    .catch(err => {
                        console.log("Error," + err)
                    });
            } else {
                // if (!validateUsername && !validateEmail && !validateCity && !validatePassword) {
                //     setErrorUsername("error");
                //     setErrorEmail("error");
                //     setErrorCity("error");
                //     setError("Estos campos no son validos.");
                // }
                // else {
                if (!validateUsername) {
                    setErrorUsername("error");
                    setError("El usuario debe contener sólo letras y numeros).");
                }
                if (!validateEmail(email)) {
                    setErrorEmail("error");
                    setError("El email no es válido.");
                }
                if (!validateCity) {
                    setErrorCity("error");
                    setError("La ciudad sólo debe contener letras.");
                }
                if (!validatePassword) {
                    setErrorPassword("error");
                    setError("El password debe contener al menos 8 caracteres, 1 minúscula, 1 mayúscula y 1 núnmero.");
                }
                if ((!validateUsername && !validateEmail(email)) || (!validateUsername && !validateCity) || (!validateUsername && !validatePassword)
                    || (!validateEmail(email) && !validateCity) || (!validateEmail(email) && !validatePassword) || (!validateCity && !validatePassword)
                ) {
                    setError("Estos campos no son validos.");
                }
            }
            // }
        } else {
            if (!username) {
                setErrorUsername("error");
            }
            if (!password) {
                setErrorPassword("error");
            }
            if (!email) {
                setErrorEmail("error");
            }
            if (!city) {
                setErrorCity("error");
            }
            if (!genre) {
                setErrorGenre("error");
            }
            if (!rating) {
                setErrorRating("error");
            }

            setError("Completa estos campos.");
            /**Faltan algun o todos los campos */
        }
    }


    return (
        <div className="container containerAddPlayer">
            <Form className="formAddPlayer">
                <Form.Row className="containerImage">
                    <div className="col-5">
                        <img className="avatarListProfile marginUpdateAvatar"
                            src={"images/avatar-tenis.png"} alt="imagen de tu perfil" />
                    </div>
                    <div className="col-1"></div>
                    <Form.Group className="col-6 colUsername" as={Col} controlId="formGridUsername">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control className={errorUsername ? "form-control form-control-red" : "form-control"}
                            type="text" as="input" maxLength="12" placeholder="Escriba su usuario" onChange={updateUsername} required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>

                    <div className="custom-file uploadAvatar col-5">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={updateImage}
                        />
                        <label className="custom-file-label marginUpdateAvatar" htmlFor="inputGroupFile01">
                            Elige Foto
                            </label>
                    </div>
                    <div className="col-1"></div>
                    <Form.Group className="col-6" as={Col} controlId="formGridPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" className={errorPassword ? "form-control form-control-red" : "form-control"}
                            as="input" maxLength="20" placeholder="Escriba su contraseña" onChange={updatePassword} required />
                    </Form.Group>

                </Form.Row>
                <Form.Row>

                    <Form.Group className="col" as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" className={errorEmail ? "form-control form-control-red" : "form-control"}
                            as="input" maxLength="30" placeholder="Escriba su email" onChange={updateEmail} required />
                    </Form.Group>
                </Form.Row>


                {/* <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Escriba su email" onChange={updateEmail} required />
                    </Form.Group>
                </Form.Row> */}
                <Form.Row>



                    <Form.Group className="col-6" as={Col} controlId="formGridCity">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control type="text" className={errorCity ? "form-control form-control-red" : "form-control"}
                            as="input" maxLength="14" placeholder="Escriba su ciudad" onChange={updateCity} required />
                    </Form.Group>
                    {/* <div className="col-1"></div> */}


                    <Form.Group className="col-4 containerGenero" as={Col} controlId="formGridGenre">
                        <Form.Label>Genero</Form.Label>
                        <Form.Control as="select" className={errorGenre ? "form-control form-control-red" : "form-control"}
                            value={genre + ""} onChange={updateGenre} required>
                            <option defaultValue={""} hidden>Elige</option>
                            <option value={"Hombre"}>Hombre</option>
                            <option value={"Mujer"}>Mujer</option>
                        </Form.Control>
                    </Form.Group>
                    {/* <div className="col-1"></div> */}
                    <Form.Group className="col" as={Col} controlId="formGridRating">
                        <Form.Label>Level</Form.Label>
                        <Form.Control as="select" className={errorRating ? "form-control form-control-red" : "form-control"}
                            value={rating + ""} onChange={updateRating} required>
                            <option defaultValue={""} hidden>Elige</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Control>

                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <div className="col">
                        {error &&
                            <p>{error}</p>
                        }
                    </div>
                    <Form.Group className="containerButtonAddPlayer col-2" as={Col} controlId="formButton">
                        {/* <Form.Label>Level</Form.Label> */}
                        <Button className="buttonAddPlahyer" variant="primary" type="button" onClick={add}>
                            Crear
                            </Button>
                    </Form.Group>


                </Form.Row>
            </Form>
        </div>
    )
};

const mapDispachToProps = {
    setToken: actions.setToken,
    setPlayer: actions.setPlayer,
    setPlayers: actions.setPlayers
}

export default connect(
    null,
    mapDispachToProps
)(AddPlayer);