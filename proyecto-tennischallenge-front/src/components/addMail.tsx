import React, { Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import * as actions from '../actions/actions';
import { connect } from 'react-redux';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';

interface IProps { }

interface IPropsGlobal {
    token: string;
    players: IPlayer[];
    player: IPlayer;
    setMessages: (msgs: IMsg[]) => void;
}

const AddMail: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player_destiny: string }>> = props => {

    let id: number = +props.match.params.id_player_destiny;
    let decoded: any = jwt.decode(props.token);

    const [subject, setSubject] = React.useState("");
    const [text, SetText] = React.useState("");
    const [inputPlayerDestiny, SetInputPlayerDestiny] = React.useState("");
    const [error, setError] = React.useState("");
    const [errorSubject, setErrorSubject] = React.useState("");
    const [errorText, setErrorText] = React.useState("");
    const [errorInputPlayerDestiny, setErrorInputPlayerDestiny] = React.useState(false);
    const [maximunCharacterText, SetMaximunCharacterText] = React.useState(0);

    const updateSubject = (event: any) => {
        setSubject(event.currentTarget.value);
        setError("");
        setErrorSubject("");
    };

    const updateText = (event: any) => {
        SetText(event.currentTarget.value);
        setError("");
        setErrorText("");
        SetMaximunCharacterText(event.currentTarget.value.length);
    };

    const updateInputPlayerDestiny = (event: any) => {
        SetInputPlayerDestiny(event.currentTarget.value);
        setError("");
        setErrorInputPlayerDestiny(false);
    };

    const addMsg = () => {
        if (subject && text && (!inputPlayerDestiny || id === +decoded.id_player)) {
            if (playerDestiny) {
                let id_player_destiny;
                if (soyYo) {
                    id_player_destiny = inputPlayerDestiny;
                } else {
                    id_player_destiny = playerDestiny.id_player;
                }
                fetch("http://localhost:8080/api/msgs/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    },
                    body: JSON.stringify({
                        id_player_destiny: id_player_destiny,
                        id_player_sent: props.player.id_player,
                        subject: subject,
                        text: text,
                    })
                })
                    .then(response => {
                        if (response.ok) {
                            fetch("http://localhost:8080/api/msgs", {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + props.token
                                }
                            })
                                .then(response => {
                                    if (response.ok) {
                                        response
                                            .json()
                                            .then((listaMsgs: IMsg[]) => {
                                                if (listaMsgs.length > 0) {
                                                    props.setMessages(listaMsgs);
                                                    props.history.push("/mailTray/sent");

                                                } else {
                                                    // console.log("la BD no ha devuelto ningun mensaje.");
                                                }
                                            })
                                            .catch(err => {
                                                // console.log("error al devolver mis mensajes." + err);
                                            })
                                    } else {
                                        // console.log("Error en response.ok");
                                    }
                                })
                                .catch(error => {
                                    setError("Response Error , ha fallado la consulta" + error);
                                    // console.log(error);
                                });
                        } else {
                            response.json().then(({ e }) => {
                                let array = e.sqlMessage.split(" ");
                                array[array.length - 4] = array[array.length - 4].replace("'", "");
                                array[array.length - 4] = array[array.length - 4].replace("'", "");
                                let err = array[array.length - 4];
                                if (e.errno === 1406) {
                                    if (err === "subject") {
                                        setError("El contenido del asunto es demasiado largo.");
                                        setErrorSubject("error");
                                    } else if (err === "text") {
                                        setError("El contenido del texto es demasiado largo.");
                                        setErrorText("error");
                                    }
                                } else {
                                    // console.log("no se porque entra aqui")
                                }
                            })
                                .catch(err => {
                                    // console.log("Error," + err)
                                });
                        }
                    })
                    .catch(err => {
                        // console.log("Error," + err)
                    })
            } else {
                // console.log("no existe playerDestiny");
            }
        } else {
            /**aqui comprobar si estan vacios o no los input */
            if (!subject) {
                setErrorSubject("error");
            }
            if (!text) {
                setErrorText("error");
            }
            if (!inputPlayerDestiny) {
                setErrorInputPlayerDestiny(true);
            }
            setError("Completa todos los campos.")
        }
    }

    let soyYo = false;
    let playerDestiny = props.players.find(p => p.id_player === +id);

    if (!playerDestiny) {
        return null;  
    }
    if (id === +decoded.id_player) {
        //estoy en mi bandeja de correo y tengo que elegir el destinatario
        //si soyYo es false entonces el destinatario esta en la url
        soyYo = true;
    }
    return (
        <div className="col receivedOrSent">
            {playerDestiny !== null && playerDestiny !== undefined && (
                <Fragment>
                    <div className="container row containerMessageNew">
                        <div className="col-1" >
                            <p className="usernameMailFrom" >De:</p>
                        </div>
                        <div className="col-1">
                            <p className="usernameMailFrom"></p>
                            <img className="imgAvatarMsg" src={props.player.avatar ? "http://localhost:8080/uploads/avatar/" + props.player.avatar : "/images/avatar-tenis.png"}
                                alt="" width="auto" height="50" />
                        </div>
                        <div className="col-1">
                            <p className="usernameMailFrom text-capitalize">{props.player.username.toLocaleLowerCase()}</p>
                        </div>
                    </div>
                    {soyYo === false && (
                        <div className="container row containerMessageNew">
                            <div className="col-1" >
                                <p className="usernameMailFrom" >Para: </p>
                            </div>
                            <div className="col-1" >
                                <img className="imgAvatarMsg" src={playerDestiny.avatar ? "http://localhost:8080/uploads/avatar/" + playerDestiny.avatar : "/images/avatar-tenis.png"}
                                    alt="" width="auto" height="50" />
                            </div>
                            <div className="col-1">
                                <p className="usernameMailFrom text-capitalize">{playerDestiny.username.toLocaleLowerCase()}</p>
                            </div>
                        </div>
                    )}
                    <Form className="container">
                        {soyYo && (

                            <Form.Group className="containerPlayerDestinyMessage" controlId="formGridState">
                                <Form.Control className={errorInputPlayerDestiny ? "selectUsernameEmail containerErrorRed" : "selectUsernameEmail"}
                                    as="select" type="text" value={inputPlayerDestiny + ""} onChange={updateInputPlayerDestiny}>
                                    <option defaultValue="" hidden>destino</option>
                                    {props.players.sort(function (a, b) {
                                        let nameA = a.username.toLowerCase();
                                        let nameB = b.username.toLowerCase();
                                        if (nameA < nameB) //sort string ascending
                                            return -1;
                                        if (nameA > nameB)
                                            return 1;
                                        return 0; //default return value (no sorting)
                                    }).map((p, i) => (
                                        <option className="text-capitalize" key={p.id_player} value={p.id_player + ""}>{p.username.toLocaleLowerCase()}</option>
                                    )
                                    )}
                                </Form.Control>
                            </Form.Group>
                        )}
                        <Form.Group controlId="formGridSubject">
                            <Form.Control className={errorSubject ? "containerErrorRed" : ""} as="input" maxLength={100} onChange={updateSubject} placeholder="Asunto" />
                        </Form.Group>
                        <Form.Group controlId="formGridTextAreaText">
                            <Form.Control className={errorText ? "textAreaMensajeNuevo containerErrorRed" : "textAreaMensajeNuevo"}
                                as="textarea" rows={3} onChange={updateText} maxLength={1000}
                                placeholder="Escriba aqui el texto del mensaje máximo 1000 caracteres" />
                        </Form.Group>
                        <Form.Group controlId="formButttonSend">
                            <div className="row">
                                <div className="col">
                                    {maximunCharacterText > 0 &&
                                        <p className="ErrorAddMessage">Maximo Caracteres {maximunCharacterText} / 1000</p>
                                    }
                                </div>
                                <div className="col">
                                    {error &&
                                        <p className="ErrorAddMessage">{error}</p>
                                    }
                                </div>
                                <div className="col containerButtonSend">
                                    <Button className="butttonSendMessage" variant="primary" type="button" onClick={addMsg}>
                                        Enviar
                                </Button>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Fragment>
            )}
            {(playerDestiny === null || playerDestiny === undefined) &&
                <div className="col">
                    {error === "no hay destinatario" &&
                        <p className="ErrorAddMessage">No puedes enviar un mensaje a este usuario ha borrado su cuenta.</p>
                    }
                </div>
            }
        </div>
    )
};

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    players: state.players,
    player: state.player

});

const mapDispachToProps = {
    setMessages: actions.setMessages,
    setPlayer: actions.setPlayer
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(AddMail);