import React from 'react';
import { Form, Col, Button, FormLabel } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';

interface IProps { }

interface IPropsGlobal {
    setToken: (token: string) => void;
    setPlayer: (player: IPlayer) => void;
    setPlayers: (players: IPlayer[]) => void;
}

const AddPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {

    const [error, setError] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [city, setCity] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [image, setImage] = React.useState();
    // const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

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

    const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.files![0]);
    };

    // const updateIsAdmin = (event: any) => {
    //     setIsAdmin(s => !s);
    //     // setError("");
    // };





    const add = () => {
        console.log("entra al fetch");
        // console.log(isAdmin);
        ///requerir campos*********************************************************************
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
                }
            })
            .catch(err => {
                console.log("Error," + err)
            })
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
                        <Form.Control placeholder="Escriba su usuario" onChange={updateUsername} required />
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
                        <Form.Control type="password" placeholder="Escriba su contraseña" onChange={updatePassword} required />
                    </Form.Group>

                </Form.Row>
                <Form.Row>

                    <Form.Group className="col" as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Escriba su email" onChange={updateEmail} required />
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
                        <Form.Control type="text" placeholder="Escriba su ciudad" onChange={updateCity} required />
                    </Form.Group>
                    {/* <div className="col-1"></div> */}


                    <Form.Group className="col-3" as={Col} controlId="formGridGenre">
                        <Form.Label>Genero</Form.Label>
                        <Form.Control as="select" value={genre} onChange={updateGenre} required>
                            <option value="" selected hidden>Elige</option>
                            <option value={"Hombre"}>Hombre</option>
                            <option value={"Mujer"}>Mujer</option>
                        </Form.Control>
                    </Form.Group>
                    {/* <div className="col-1"></div> */}
                    <Form.Group className="col-3" as={Col} controlId="formGridRating">
                        <Form.Label>Level</Form.Label>
                        <Form.Control as="select" value={rating + ""} onChange={updateRating} required>
                            <option selected hidden>Elige</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Control>

                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group className="containerButtonAddPlayer" as={Col} controlId="formButton">
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