import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as actions from '../actions/actions';
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
    const [city, setCity] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [rating, setRating] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [error, setError] = React.useState("");
    const [errorUsername, setErrorUsername] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");
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
        /^([a-zA-ZÀ-ÿ' ]+)$/.test(city);

    const validateUsername = //eslint-disable-line
        /^([a-zA-Z0-9' ]+)$/.test(username);

    let id_player: number = +props.match.params.id_player;
    let player = props.players.find(p => p.id_player === id_player);

    const edit = () => {
        if (username && email && city && genre && rating) {
            if (validateEmail(email) && validateCity && validateUsername) {
                if (props.token) {
                    let decoded: any = jwt.decode(props.token);
                    const id: number = +props.match.params.id_player;
                    if (decoded !== null && (id === decoded.id_player || props.player.isAdmin === true)) {
                        const formData = new FormData();
                        // esto es para poder cambiarle la foto y ponerle el nombre de su id.extension 
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
                        fetch("http://localhost:8080/api/players/" + id, {
                            method: "PUT",
                            headers: {
                                Authorization: "Bearer " + props.token
                            },
                            body: formData
                        })
                            .then(response => {
                                if (response.ok) {
                                    response
                                        .json()
                                        .then((lista: any) => {
                                            if (lista.length === 1) {
                                                lista[0] = {
                                                    ...lista[0],
                                                    ...({ isAdmin: lista[0].isAdmin === 1 ? true : false })
                                                }
                                                props.updatePlayers(lista[0]);
                                                // entro aqui porque yo me he editado, pero si soy admin puedo editar a otros
                                                if (id === decoded.id_player) {
                                                    props.updatePlayer(lista[0]);
                                                }
                                                if(props.player.isAdmin && id !== decoded.id){
                                                    props.history.push("/players/" + id);
                                                }
                                                else{
                                                    props.history.push("/profile/" + id);
                                                }                                                
                                            } else if (lista.length > 1) {
                                                // console.log("viene mas de 1 player");
                                            } else {
                                                // console.log("no viene ningun usuario.")
                                            }
                                        })
                                        .catch(err => {
                                            setError("Error en el json.");
                                        });
                                } else {
                                    response.json().then(({ e }) => {
                                        let array = e.sqlMessage.split(" ");
                                        array[array.length - 1] = array[array.length - 1].replace("'", "");
                                        array[array.length - 1] = array[array.length - 1].replace("'", "");
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
                                            // console.log("no se porque entra aqui")
                                        }
                                    })
                                        .catch(err => {
                                            // console.log("Error," + err)
                                        });
                                    // setError("Error el usuario o el emial ya existe.");
                                }
                            })
                            .catch(err => {
                                // console.log("Error," + err)
                            })
                    }
                    else {
                        // console.log("El token no se pudo decodificar");
                    }
                }
                else {
                    // console.log("El token no existe");
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
                if ((!validateUsername && !validateEmail(email)) || (!validateUsername && !validateCity) || (!validateEmail(email) && !validateCity)) {
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
                                type="text" as="input" placeholder="Escriba su usuario" maxLength={12} value={username} onChange={updateUsername} required />
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
                                placeholder="Escriba su ciudad" maxLength={14} value={city} onChange={updateCity} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col" as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" as="input" className={errorEmail ? "form-control form-control-red" : "form-control"}
                                placeholder="Escriba su email" maxLength={30} value={email} onChange={updateEmail} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group className="col containerGenero" as={Col} controlId="formGridGenre">
                            <Form.Label>Genero</Form.Label>
                            <Form.Control as="select" className={errorGenre ? "form-control form-control-red" : "form-control"}
                                value={genre} onChange={updateGenre} required> {/*TODO selected*/}
                                {/* <option value="" selected hidden>Elige</option> */}
                                <option value={"HOMBRE"}>Hombre</option>
                                <option value={"MUJER"}>Mujer</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="col-1"></div>
                        <Form.Group className="col-2" as={Col} controlId="formGridRating">
                            <Form.Label>Level</Form.Label>
                            <Form.Control as="select" className={errorRating ? "form-control form-control-red" : "form-control"}
                                value={rating + ""} onChange={updateRating} required> {/*TODO  selected*/}
                                <option value={"1"}>1</option>
                                <option value={"2"}>2</option>
                                <option value={"3"}>3</option>
                                <option value={"4"}>4</option>
                                <option value={"5"}>5</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="col-1"></div>
                        {props.player.isAdmin &&
                            <Form.Group className="col-5 containerGenero" as={Col} controlId="formGridRating">
                                <Form.Group id="formGridCeckbox">
                                    <Form.Label>Administrador</Form.Label>
                                    <Form.Check id="admin" className="CheckBoxAdmin" type="checkbox" onChange={updateIsAdmin} checked={isAdmin} />
                                </Form.Group>
                            </Form.Group>
                        }
                    </Form.Row>
                    <Form.Row>
                        {error &&
                            <div className="col">
                                <p className="bottonErrorEdit">{error}</p>
                            </div>
                        }
                        <Form.Group className="containerButtonAddPlayer col-2" as={Col} controlId="formButton">
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