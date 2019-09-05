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
    updatePlayer: (player: IPlayer) => void;
    updatePlayers: (player: IPlayer) => void;

    players: IPlayer[];
    token: string;
}

const EditPlayer: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player: string }>> = props => {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    // const [password, setPassword] = React.useState("");
    const [city, setCity] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [image, setImage] = React.useState();
    const [error, setError] = React.useState("");
    const [errorUsername, setErrorUsername] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");
    // const [errorPassword, setErrorPassword] = React.useState("");
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

    // const updatePassword = (event: any) => {
    //     setPassword(event.currentTarget.value);
    //     // setError("");
    // };
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

    const updateIsAdmin = (event: any) => {
        setIsAdmin(s => !s);
        // setIsAdmin(event.target.checked);
        console.log("isAdmin en updatedIsAdmin: " + isAdmin);
        setError("");

    };

    const updateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.currentTarget.files![0]);
    };

    const validEmailRegex = new RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
    );

    const validateEmail = (e: string) => validEmailRegex.test(e); //emailvalue es el valor de mi hook para el email, que recojo del onchange del inpu

    const validateCity = //eslint-disable-line
        /^([a-zA-Z' ]+)$/.test(city);

    const validateUsername = //eslint-disable-line
        /^([a-zA-Z0-9' ]+)$/.test(username);


    let id_player: number = +props.match.params.id_player;
    let player = props.players.find(p => p.id_player === id_player);




    console.log("player:");
    console.log(player);

    const edit = () => {
        if (username && email && city && genre && rating) {
            if (validateEmail(email) && validateCity && validateUsername) {
            if (props.token) {
                let decoded: any = jwt.decode(props.token);
                const id: number = +props.match.params.id_player;
                if (decoded !== null && (id === decoded.id_player || props.player.isAdmin === true)) {
                    console.log(decoded);

                    console.log("entra al fetch");
                    console.log(isAdmin);

                    const formData = new FormData();
                    // esto es para poder cambiarle la foto y pnerle el nombre de su id.extension 
                    // a otra persona que no sea yo si soy Admin
                    formData.append("id_player", "" + id);
                    if (image) {
                        formData.append("file", image);
                    } else {
                        formData.append("file", "");
                    }
                    formData.append("username", username);
                    formData.append("email", email);
                    formData.append("city", city);
                    formData.append("genre", genre);
                    formData.append("rating", rating);
                    let administador = isAdmin ? "1" : "0";
                    formData.append("isAdmin", administador);


                    console.log(isAdmin);

                    console.log(administador);
                    fetch("http://localhost:8080/api/players/" + id, {
                        method: "PUT",
                        headers: {
                            // "Content-Type": "application/json"
                            Authorization: "Bearer " + props.token
                        },
                        body: formData
                    })
                        // fetch("http://localhost:8080/api/players/" + id, {
                        //     method: "PUT",
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //         Authorization: "Bearer " + props.token
                        //     },
                        //     body: JSON.stringify({
                        //         ...(username && { username: username }),
                        //         ...(email && { email: email }),
                        //         // password: password,
                        //         ...(city && { city: city }),
                        //         ...(genre && { genre: genre }),
                        //         ...(rating && { rating: rating }),
                        //         ...(isAdmin && { isAdmin: isAdmin })
                        //     })
                        // })
                        .then(response => {
                            if (response.ok) {
                                response
                                    .json()
                                    .then((lista: any) => {
                                        console.log(lista);
                                        if (lista.length === 1) {
                                            console.log("usuario modificado y listado");
                                            console.log(lista);
                                            /***************************************** */
                                            lista[0] = {
                                                ...lista[0],
                                                ...({ isAdmin: lista[0].isAdmin === 1 ? true : false })
                                            }
                                            props.updatePlayers(lista[0]);
                                            /***************************************** */
                                            // entro aqui porque yo me he editado, pero si soy admin puedo editar a otros
                                            if (id === decoded.id_player) {
                                                console.log("soy yo o deberia:")
                                                console.log(lista[0]);
                                                props.updatePlayer(lista[0]);
                                            }

                                            props.history.push("/profile/" + id);
                                        } else if (lista.length > 1) {
                                            console.log("viene mas de 1 player");
                                        } else {
                                            console.log("no viene ningun usuario.")
                                        }
                                        ;
                                    })
                                    .catch(err => {
                                        setError("Error en el json.");
                                    });
                                // console.log("usuario creado")
                                // const us: IPlayer = {
                                //     ...props.player,
                                //     //hay que traerte primero el nombre y luego lo guardas aqui
                                //     // ...(avatar && { avatar: image }),
                                //     ...(username && { username: username }),
                                //     ...(email && { email: email }),
                                //     // password: password,
                                //     ...(city && { city: city }),
                                //     ...(genre && { genre: genre }),
                                //     ...(rating && { rating: +rating }),
                                //     ...(isAdmin && { isAdmin: isAdmin })
                                // }
                                // console.log(us);

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

                                /***************** Hacer lo mismo que en add para ver si email o username existe**********************/
                                console.log("Error el usuario o el emial ya existe.");
                                setError("Error el usuario o el emial ya existe.");
                            }
                        })
                        .catch(err => {
                            console.log("Error," + err)
                        })
                }
                else {
                    console.log("El token no se pudo decodificar");
                }
            }
            else {
                console.log("El token no existe");
            }
        } else {
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
            if ((!validateUsername && !validateEmail(email)) || (!validateUsername && !validateCity) || (!validateEmail(email) && !validateCity) ) {
                setError("Estos campos no son validos.");
            }
        }
        } else {
            if (!username) {
                setErrorUsername("error");
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
            /**algun campo esta vacio */
            setError("Completa todos los campos");
        }
    };


    React.useEffect(() => {
        if (player) {
            console.log(player)
            setUsername(player.username);
            setEmail(player.email)
            setCity(player.city);
            setGenre(player.genre);
            setRating(player.rating + "");
            setIsAdmin(player.isAdmin);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container containerAddPlayer">
            {player && id_player && (player.id_player === id_player || props.player.isAdmin) && (
                <Form className="formAddPlayer">

                    <Form.Row className="containerImage">
                        <div className="col-5">
                            <img className="avatarListProfile"
                                src={player.avatar ? "http://localhost:8080/uploads/avatar/" + player.avatar + "?" + (new Date()).valueOf() :
                                    "../../../images/avatar-tenis.png"} alt="" />
                        </div>
                        <div className="col-1"></div>
                        <Form.Group className="col-6 colUsername" as={Col} controlId="formGridUsername">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control className={errorUsername ? "form-control form-control-red" : "form-control"}
                                type="text" as="input" placeholder="Escriba su usuario" maxLength="12" value={username} onChange={updateUsername} required />
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
                        <Form.Group className="col-6" as={Col} controlId="formGridCity">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" as="input" className={errorCity ? "form-control form-control-red" : "form-control"}
                                placeholder="Escriba su ciudad" maxLength="14" value={city} onChange={updateCity} required />
                        </Form.Group>


                    </Form.Row>

                    {/* <Form.Row>
                        <img className="avatarListProfile"
                            src={player.avatar ? "http://localhost:8080/uploads/avatar/" + player.avatar + "?" + Date() :
                                "../../../images/avatar-tenis.png"} alt="" />
                    </Form.Row> */}
                    {/* <Form.Row>
                        <Form.Group controlId="formGridUsername">
                            <input type="file" className="btn btn-info" placeholder="Enter username" onChange={updateImage} />
                        </Form.Group>
                    </Form.Row> */}
                    <Form.Row>
                        {/* <Form.Group controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control placeholder="Enter username" onChange={updateUsername} value={username} />
                        </Form.Group> */}
                        <Form.Group className="col" as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" as="input" className={errorEmail ? "form-control form-control-red" : "form-control"}
                                placeholder="Escriba su email" maxLength="30" value={email} onChange={updateEmail} required />
                        </Form.Group>
                        {/* <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={updateEmail} value={email} />
                        </Form.Group> */}
                    </Form.Row>
                    {/* <Form.Row> */}
                    {/* <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={updatePassword} />
                    </Form.Group> */}


                    {/* <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="Enter city" onChange={updateCity} value={city} />
                        </Form.Group>
                    </Form.Row> */}

                    <Form.Row>
                        <Form.Group className="col containerGenero" as={Col} controlId="formGridGenre">
                            <Form.Label>Genero</Form.Label>
                            <Form.Control as="select" className={errorGenre ? "form-control form-control-red" : "form-control"}
                                value={genre} selected onChange={updateGenre} required>
                                {/* <option value="" selected hidden>Elige</option> */}
                                <option value={"HOMBRE"}>Hombre</option>
                                <option value={"MUJER"}>Mujer</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Form.Group className="col-4 containerGenero" as={Col} controlId="formGridState">
                            <Form.Label>Genero</Form.Label>
                            <Form.Control as="select" className={errorGenre ? "form-control form-control-red" : "form-control"}
                            value={genre} onChange={updateGenre}>
                                <option value="HOMBRE">Hombre</option>
                                <option value="MUJER">Mujer</option>
                            </Form.Control>
                        </Form.Group> */}


                        {/* <Form.Group as={Col} controlId="formGridRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="number" placeholder="Enter rating" onChange={updateRating} />
                    </Form.Group> */}
                        {/* <div className="col-3"></div> */}
                        <div className="col-1"></div>
                        <Form.Group className="col-2" as={Col} controlId="formGridRating">
                            <Form.Label>Level</Form.Label>
                            <Form.Control as="select" className={errorRating ? "form-control form-control-red" : "form-control"}
                                value={rating + ""} selected onChange={updateRating} required>
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                            </Form.Control>

                        </Form.Group>
                        {/* <Form.Group classname="col-2 " as={Col} controlId="formGridState">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as="select" value={rating + ""} onChange={updateRating}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Form.Control>
                        </Form.Group> */}
                        {/* <div className="col-1"></div> */}
                        <div className="col-1"></div>
                        {props.player.isAdmin &&
                            <Form.Group className="col-5 containerGenero" as={Col} controlId="formGridRating">
                                <Form.Group id="formGridCeckbox">
                                    <Form.Label>Administrador</Form.Label>
                                    <Form.Check id="admin" className="CheckBoxAdmin" type="checkbox" name="Administrador" onChange={updateIsAdmin} checked={isAdmin} />
                                </Form.Group>

                                {/* <Form.Group id="formGridCheckbox2">
            <Form.Check type="checkbox" label="PrebaAdmin" onChange={updateIsAdmin} checked={isAdmin} />
        </Form.Group> */}
                            </Form.Group>
                        }

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


                </Form.Row> */}{
                        console.log(props.player.isAdmin)
                    }
                    {/* {props.player.isAdmin &&
                        <Fragment>
                            <Form.Group id="formGridCheckbox">
                                <Form.Check id="admin" className="Administrador" type="checkbox" label="Administrador" name="Administrador" onChange={updateIsAdmin} checked={isAdmin} />
                            </Form.Group> */}

                    {/* <Form.Group id="formGridCheckbox2">
                                <Form.Check type="checkbox" label="PrebaAdmin" onChange={updateIsAdmin} checked={isAdmin} />
                            </Form.Group> */}
                    {/* </Fragment>
                    } */}
                    {/* <Button variant="primary" type="button" onClick={edit}>
                        Save
                </Button> */}
                    <Form.Row>
                        {error &&
                            <div className="col">

                                <p className="bottonErrorEdit">{error}</p>

                            </div>
                        }
                        <Form.Group className="containerButtonAddPlayer col-2" as={Col} controlId="formButton">
                            {/* <Form.Label>Level</Form.Label> */}
                            <Button className="buttonAddPlahyer" variant="primary" type="button" onClick={edit}>
                                Guardar
                            </Button>
                        </Form.Group>


                    </Form.Row>
                </Form>
            )}
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players,
    player: state.player

});

const mapDispachToProps = {
    setToken: actions.setToken,
    updatePlayer: actions.updatePlayer,
    updatePlayers: actions.updatePlayers
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(EditPlayer);