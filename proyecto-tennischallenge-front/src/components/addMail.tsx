import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
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
    // setPlayer: (player: IPlayer) => void;
}

const AddMail: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player_destiny: string }>> = props => {

    const [error, setError] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [text, SetText] = React.useState("");
    // const [inputPlayerDestiny, SetinputPlayerDestiny] = React.useState("");
    const [inputListPlayerTo, SetinputListPlayerTo] = React.useState("");

    // const [usernameDestiny, setUsernameDestiny] = React.useState("");
    // const [usernameSent, setUsernameSent] = React.useState("");

    const updateSubject = (event: any) => {
        setSubject(event.currentTarget.value);
        // setError("");
    };

    const updateText = (event: any) => {
        SetText(event.currentTarget.value);
        // setError("");
    };

    // const updateInputPlayerDestiny = (event: any) => {
    //     SetinputPlayerDestiny(event.currentTarget.value);
    //     // setError("");
    // };

    const updateInputListPlayerTo = (event: any) => {
        SetinputListPlayerTo(event.target.value);
        // setError("");
    };


    const addMsg = () => {
        console.log("entra al fetch");
        if (playerDestiny) {
            let id_player_destiny;
            if (soyYo) {
                id_player_destiny = inputListPlayerTo;
                console.log("voy a enviar mensaje a alguien: " + id_player_destiny);
            } else {
                id_player_destiny = playerDestiny.id_player;
                console.log("voy a enviar mensaje a " + id_player_destiny);
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
                        console.log("mensaje creado")
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
                                                console.log(listaMsgs);
                                                props.setMessages(listaMsgs);
                                                props.history.push("/mailTray/sent");

                                            } else {
                                                console.log("la BD no ha devuelto ningun mensaje.");
                                            }
                                        })
                                        .catch(err => {
                                            console.log("error al devolver mis mensajes." + err);
                                        })

                                } else {
                                    setError("Response.ok, Error ," + error);
                                    console.log(error);
                                }
                            })
                            .catch(error => {
                                setError("Response Error , ha fallado la consulta" + error);
                                console.log(error);
                            });
                    }
                })
                .catch(err => {
                    console.log("Error," + err)
                })
        } else {
            console.log(" no existe playerDestiny");
        }
    }


    let id: number = +props.match.params.id_player_destiny;
    let decoded: any = jwt.decode(props.token);
    let soyYo = false;
    // let playerDestiny: any = null;
    if (id === +decoded.id_player) {
        soyYo = true;
    }
    // else {
    let playerDestiny = props.players.find(p => p.id_player === +id);
    // }


    console.log(playerDestiny);
    console.log("persona de destino: " + inputListPlayerTo)
    return (
        <div className="col-9">

            {playerDestiny !== null && playerDestiny !== undefined && (
                <Form className="container">

                    <Form.Group controlId="formGridFrom">
                        <Form.Label>From:</Form.Label>
                        {/* <Form.Control type="email" value={props.player.username} onChange={updateUsernameSent} /> */}
                        <Form.Label> {props.player.username} </Form.Label>

                    </Form.Group>
                    {soyYo === false && (
                        <Form.Group controlId="formGridTo">
                            <Form.Label>To:</Form.Label>
                            <Form.Label> {playerDestiny.username} </Form.Label>
                        </Form.Group>
                    )}
                    {soyYo && (
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>To</Form.Label>
                            <Form.Control as="select" type="text" value={inputListPlayerTo + ""} onChange={updateInputListPlayerTo}>
                                <option defaultValue="" hidden>Elige destinatario</option>
                                {props.players.sort(function (a, b) {
                                    let nameA = a.username.toLowerCase();
                                    let nameB = b.username.toLowerCase();
                                    if (nameA < nameB) //sort string ascending
                                        return -1;
                                    if (nameA > nameB)
                                        return 1;
                                    return 0; //default return value (no sorting)
                                }).map((p, i) => (
                                    // (i=== 0) && (
                                    //     <option defaultValue={p.id_player+""}>{p.username}</option>

                                    // ) ||  (
                                    <option key={p.id_player} value={p.id_player + ""}>{p.username}</option>

                                    // )
                                )
                                )}

                            </Form.Control>

                        </Form.Group>
                    )}
                    <Form.Group controlId="formGridSubject">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control onChange={updateSubject} />
                    </Form.Group>


                    <Form.Group controlId="formGridTextAreaText">
                        <Form.Label>Texto: </Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={updateText} />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={addMsg}>
                        Enviar
                </Button>

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
    setMessages: actions.setMessages,
    setPlayer: actions.setPlayer
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(AddMail);