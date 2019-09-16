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
                            .then((notifications) => {
                                if (notifications[0]) {
                                    props.setNotifications(notifications[0]);
                                } else {
                                    // console.log("no me actualiza las notificaciones porque notificacion[0] no existe")
                                }
                            })
                            .catch(err => {
                                // console.log("Error en el json. " + err);
                            });
                    } else {
                        // console.log("responde.ok da error.");
                    }
                })
                .catch(err => {
                    // console.log("Error en response. " + err);
                });
        } else {
            // console.log("aun no hay token");
        }
    }

    const viewMsg = (id_message: number) => {
        let msg = props.msgs.filter(m => m.id_messages === id_message);
        if (msg) {
            if (!msg[0].watched) {
                fetch("http://localhost:8080/api/msgs/" + id_message, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + props.token
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            // eslint-disable-next-line
                            let msgs = props.msgs.map(m => {
                                if (m.id_messages === id_message) {
                                    m.watched = true;
                                }
                            });
                            setMessages(msgs);
                            //actualizo mis notificaciones
                            updatednotificationsFriendship();
                            setError("");
                            props.history.push("/mailTray/received/" + id_message);
                        } else {
                            // console.log("error en response.ok");
                        }
                    })
                    .catch(error => {
                        // setError("Response Error , ha fallado la consulta" + error);
                    });
            } else {
                // console.log("el msg ya esta visto o no es mensaje recibido");
                props.history.push("/mailTray/received/" + id_message);
            }
        } else {
            // console.log("el msg no existe");
        }
    }

    useEffect(() => {
        if (props.msgs) {
            if (props.token) {
                const decoded = jwt.decode(props.token);
                if (decoded !== null && typeof decoded !== "string") {
                    let msgsReceived = props.msgs.filter(m => m.id_player_destiny === decoded.id_player);
                    if (msgsReceived.length > 0) {
                        setError("");
                        setMessagesHooks(msgsReceived);
                    } else {
                        setError("No tienes mensajes recibidos.");
                    }
                } else {
                    // console.log("no se ha podido decodificar token")
                }
            } else {
                // console.log("no hay token");
            }
        } else {
            // console.log("no hay mensajes en la store, haciendo UseEffect.");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.msgs]);

    if (!props.msgs) {
        setError("No tienes mensajes recibidos.")
        return null;
    }

    if (!props.player) {
        return null;
    }

    return (
        <div className="col receivedOrSent">
            {messagesHooks.length > 0 && messagesHooks.map((m:any) =>
                <Link key={m.id_messages} to={"/mailTray/received/" + m.id_messages} onClick={() => viewMsg(m.id_messages)}>
                    <div className={m.watched ? "row messageResume colBorder" : "row messageResume rowMsgReceived colBorder"}>
                        <div className="col-sm-5 col-lg-1  colum">
                            <img className="imgAvatarMsg" src={m.avatar ? "http://localhost:8080/uploads/avatar/" + m.avatar : "/images/avatar-tenis.png"}
                                alt="" width="auto" height="50" />
                        </div>
                        <div className="col-sm-5 col-lg-2 colum text-capitalize">
                            {m.username.toLocaleLowerCase()}
                        </div>
                        <div className="col-7 colum ">
                            {m.subject}
                        </div>
                        <div className="col-2 colum ">
                            <Badge className="badge-date" variant="secondary">{new Date(m.date).toLocaleDateString()}</Badge>
                        </div>
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