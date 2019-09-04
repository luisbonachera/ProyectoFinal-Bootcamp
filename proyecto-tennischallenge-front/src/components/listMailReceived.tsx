import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { setMessages } from '../actions/actions';
import { Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import { Badge } from 'react-bootstrap';
import { INotifications } from '../interfaceINotifications';

interface IPropsGloblal {
    token: string,
    msgs: IMsg[],
    player: IPlayer,
    setMessages: (msgs: IMsg[]) => void;
    setNotifications: (notification: INotifications) => void;
}

const ListMailReceived: React.FC<IPropsGloblal & RouteComponentProps> = props => {

    const [error, setError] = React.useState("");
    const [messagesHooks, setMessagesHooks] = React.useState<IMsg[]>([]);

    const updatednotificationsFriendship = () => {
        if (props.token) {
            fetch("http://localhost:8080/api/notifications", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token
                },
            })
                .then(response => {
                    if (response.ok) {
                        response
                            .json()
                            // .then((notifications: INotifications) => {
                            .then((notifications) => {

                                // console.log(notifications);
                                // console.log(notifications[0]);
                                if (notifications[0]) {
                                    // if (notifications[0].numbers_messages > 0 || 
                                    //   notifications[0].numbers_requestFriend > 0 ||
                                    //   notifications[0].numbers_acceptedFriend > 0) {
                                    console.log("actualizando mis notificaciones");
                                    console.log(notifications);
                                    props.setNotifications(notifications[0]);
                                    // console.log(notifications);
                                    // } else {
                                    //   // console.log("no hay notificaciones");
                                    // }

                                } else {
                                    console.log("no me actualiza las notificaciones porque notificacion[0] no existe")
                                }

                            })
                            .catch(err => {
                                console.log("Error en el json. " + err);
                            });
                    } else {
                        console.log("responde.ok da error.");
                    }
                })
                .catch(err => {
                    console.log("Error en response. " + err);
                });


        } else {
            // console.log("aun no hay token");
        }
    }

    const viewMsg = (id_message: number) => {
        let msg = props.msgs.filter(m => m.id_messages === id_message);
        if (msg) {
            if (!msg[0].watched) {
                //fetch edit msg y redirigir

                fetch("http://localhost:8080/api/msgs/" + id_message, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            ///deberia comprobar mas cosas?

                            // eslint-disable-next-line
                            let msgs = props.msgs.map(m => {
                                if (m.id_messages === id_message) {
                                    m.watched = true;
                                }
                            });
                            // console.log("mensajes");
                            // console.log(msgs);
                            setMessages(msgs);
                            //actualizo mis notificaciones
                            updatednotificationsFriendship();
                            setError("");
                            props.history.push("/mailTray/received/" + id_message);
                        } else {
                            console.log("error en response.ok");
                        }
                    })
                    .catch(error => {
                        setError("Response Error , ha fallado la consulta" + error);
                        console.log(error);
                    });
            } else {
                console.log("el msg ya esta visto o no es mensaje recibido");
                props.history.push("/mailTray/received/" + id_message);
            }
        } else {
            console.log("el msg no existe");

        }
    }



    useEffect(() => {
        if (props.msgs) {
            if (props.token) {
                const decoded = jwt.decode(props.token);
                if (decoded !== null && typeof decoded !== "string") {
                    ////mirar y cambiar y descomentar/////////////////////////////////////////////////////
                    let msgsReceived = props.msgs.filter(m => m.id_player_destiny === decoded.id_player);
                    // let msgsReceived = props.msgs.filter(m => m.id_player_sent === decoded.id_player);
                    // console.log(msgsReceived);
                    if (msgsReceived.length > 0) {
                        // console.log("hay msg recibidos y los guardo");
                        // setMessagesSent([]);
                        // setMessagesReceived(msgsReceived);
                        setError("");
                        setMessagesHooks(msgsReceived);
                        // console.log("error:" + error);
                        // console.log("msgsReceived");
                        // console.log(msgsReceived);
                    } else {
                        // console.log("no hay mensajes recibidos");
                        setError("No tienes mensajes recibidos.");
                        // props.history.push("/mailTray/received");
                    }

                } else {
                    console.log("no se ha podido decodificar token")
                }
            } else {
                console.log("no hay token");
            }
        } else {
            console.log("no hay mensajes en la store, haciendo UseEffect.");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.msgs]);

    if (!props.msgs) {
        // console.log("no hay mensajes en la store");
        setError("No tienes mensajes recibidos.")
        return null;
    }

    // console.log("mensajes received fuera de useEffect:");
    // console.log(messagesHooks);

    if (!props.player) {
        return null;
    }

    return (
        <div className="col receivedOrSent">
            {/* {messagesHooks.length >0 &&
            <div className="row" >
                <div className="col-2 colum colBorder">
                    De:
                </div>
                <div className="col-8 colum colBorder">
                    Asunto
                </div>
                <div className="col-2 colum colBorder">
                    Fecha
                </div> */}
            {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
            {/* <div className="col colBorder">
                    Visto
                </div> */}
            {/* </div>
            } */}
            {messagesHooks.length > 0 && messagesHooks.map((m:any) =>
                // <Link to={"/mailTray/"+props.match.params.typeMessage + "/" + m.id_messages} >
                // los mensajes received y no vistos son los que se deberian de poner de otro color
                <Link key={m.id_messages} to={"/mailTray/received/" + m.id_messages} onClick={() => viewMsg(m.id_messages)}>

                    <div className={m.watched ? "row messageResume colBorder" : "row messageResume rowMsgReceived colBorder"}>
                        <div className="col-1 colum">
                            <img className="imgAvatarMsg" src={m.avatar ? "http://localhost:8080/uploads/avatar/" + m.avatar : "/images/avatar-tenis.png"}
                                alt="" width="auto" height="50" />
                        </div>
                        <div className="col-2 colum text-capitalize">
                            {m.username.toLocaleLowerCase()}
                        </div>
                        {/* <div className="col">
                            {props.player.username}
                        </div> */}
                        <div className="col-7 colum ">
                            {m.subject}
                        </div>
                        <div className="col-2 colum ">
                            <Badge className="badge-date" variant="secondary">{new Date(m.date).toLocaleDateString()}</Badge>
                            {/* {new Date(m.date).toLocaleString()} */}
                        </div>
                        {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
                        {/* <div className="col colBorder">
                            {m.watched ? "SI" : "NO"}
                        </div> */}

                    </div>
                </Link>
            )}

            {error && (
                <div className="containerErrorMailSentorReceived">
                    <div className="col errorMailSentorReceived">
                        {error}
                    </div>
                </div>
            )}

        </div >
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    msgs: state.msgs,
    player: state.player

});

const mapDispachToProps = {
    setMessages: actions.setMessages,
    setNotifications: actions.setNotifications
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListMailReceived);