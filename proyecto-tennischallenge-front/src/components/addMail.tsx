import React from 'react';
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
    // setPlayer: (player: IPlayer) => void;
}

const AddMail: React.FC<IProps & IPropsGlobal & RouteComponentProps<{ id_player_destiny: string }>> = props => {

    const [error, setError] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [text, SetText] = React.useState("");
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

    // const updateUsernameDestiny = (event: any) => {
    //     setUsernameDestiny(event.currentTarget.value);
    //     // setError("");
    // };
    // const updateUsernameSent = (event: any) => {
    //     setUsernameSent(event.currentTarget.value);
    //     // setError("");
    // };


    const addMsg = () => {
        console.log("entra al fetch");
        if (playerDestiny) {
            fetch("http://localhost:8080/api/msgs/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
                body: JSON.stringify({
                    id_player_destiny: playerDestiny.id_player,
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
                                                console.log("la BD no ha devuelto ningun mensaje.")
                                            }
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
    return (
        <div>

       {playerDestiny !== null && playerDestiny !== undefined && (
            <Form>
               
                    <Form.Group controlId="formGridFrom">
                        <Form.Label>From:</Form.Label>
                        {/* <Form.Control type="email" value={props.player.username} onChange={updateUsernameSent} /> */}
                        <Form.Control type="text" value={props.player.username} />

                    </Form.Group>
                    <Form.Group controlId="formGridTo">
                        <Form.Label>To:</Form.Label>

                        {/* <Form.Control value={playerDestiny.username} onChange={updateUsernameDestiny} /> */}
                        {soyYo === false && (
                        <Form.Control type="text" value={playerDestiny.username} />
                        )}
                        {soyYo && (
                        <Form.Control type="text"  />
                        )}

                    </Form.Group>

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