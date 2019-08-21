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

interface IPropsGloblal {
    token: string,
    msgs: IMsg[],
    player: IPlayer,
    setMessages: (msgs: IMsg[]) => void;
}

const ListMailReceived: React.FC<IPropsGloblal & RouteComponentProps> = props => {

    const [error, setError] = React.useState("");
    const [messagesHooks, setMessagesHooks] = React.useState<IMsg[]>([]);

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
                            let msgs = props.msgs.map(m => {
                                if (m.id_messages === id_message) {
                                    m.watched = true;
                                }
                            });
                            console.log("mensajes");
                            console.log(msgs);
                            setMessages(msgs);
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
                    console.log(msgsReceived);
                    if (msgsReceived.length > 0) {
                        console.log("hay msg recibidos y los guardo");
                        // setMessagesSent([]);
                        // setMessagesReceived(msgsReceived);
                        setError("");
                        setMessagesHooks(msgsReceived);
                        console.log("error:" + error);
                        console.log("msgsReceived");
                        console.log(msgsReceived);
                    } else {
                        console.log("no hay mensajes recibidos");
                        setError("no hay mensajes recibidos");
                        // props.history.push("/mailTray/received");
                    }

                } else {
                    console.log("no se ha podido decodificar token")
                }
            } else {
                console.log("no hay token");
            }
        } else {
            setError("no hay mensajes en la store, haciendo UseEffect.");
        }
    }, [props.msgs]);

    if (!props.msgs) {
        console.log("no hay mensajes en la store");
        setError("No tienes mensajes Recibidos.")
        return null;
    }

    console.log("mensajes received fuera de useEffect:");
    console.log(messagesHooks);

    if (!props.player) {
        return null;
    }

    return (
        <div className="col receivedOrSent">
            {messagesHooks.length >0 &&
            <div className="row" >
                <div className="col colum colBorder">
                    From:
                </div>
                <div className="col colum colBorder">
                    Asunto
                </div>
                <div className="col colum colBorder">
                    Fecha:
                </div>
                {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
                {/* <div className="col colBorder">
                    Visto
                </div> */}
            </div>
            }
            {messagesHooks.length >0 && messagesHooks.map(m =>
                // <Link to={"/mailTray/"+props.match.params.typeMessage + "/" + m.id_messages} >
                // los mensajes received y no vistos son los que se deberian de poner de otro color
                <Link key={m.id_messages} to={"/mailTray/received/" + m.id_messages} onClick={() => viewMsg(m.id_messages)}>

                    <div className={m.watched ?"row": "row rowMsgReceived" }>
                        <div className="col colum colBorder">
                            {m.username}
                        </div>
                        {/* <div className="col">
                            {props.player.username}
                        </div> */}
                        <div className="col colum colBorder">
                            {m.subject}
                        </div>
                        <div className="col colum colBorder">
                            {new Date(m.date).toLocaleString()}
                        </div>
                        {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
                        {/* <div className="col colBorder">
                            {m.watched ? "SI" : "NO"}
                        </div> */}

                    </div>
                </Link>
            )}
            {error && (
                <div className="col">
                    {error}
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
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListMailReceived);