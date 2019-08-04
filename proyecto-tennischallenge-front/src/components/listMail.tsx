import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { setMessages } from '../actions/actions';
import { messagesReducer } from '../reducers/messagesReducer';
import { Link } from 'react-router-dom';

interface IPropsGloblal {
    token: string,
    msgs: IMsg[],
    setMessages: (msgs: IMsg[]) => void;
}

const ListMail: React.FC<IPropsGloblal & RouteComponentProps<{ typeMessage: string }>> = props => {

    const [error, setError] = React.useState("");
    const [messagesReceived, setMessagesReceived] = React.useState<IMsg[]>([]);
    const [messageSent, setMessagesSent] = React.useState<IMsg[]>([]);
    const [messagesHooks, setMessagesHooks] = React.useState<IMsg[]>([]);

    // const [inputUsername, setInputUsername] = React.useState("");
    // const [inputCity, setInputCity] = React.useState("");


    // const UpdateMessagesReceived = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setmessagesReceived(event.target.value);
    //     setError("");
    // };


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
                            let msgs = props.msgs.map(m=> {
                                if (m.id_messages === id_message){
                                    m.watched = true;
                                }
                            });
                            setMessages(msgs);
                            props.history.push("/mailTray/" + props.match.params.typeMessage + "/" + id_message);
                        } else {
                            console.log("el mesajes ya estaba visto");
                        }
                    })
                    .catch(error => {
                        setError("Response Error , ha fallado la consulta" + error);
                        console.log(error);
                    });
            } else {
                console.log("el msg ya esta visto");
            }
        } else {
            console.log("el msg no existe");
        }
    }
    
    useEffect(() => {
        let typeMessage = props.match.params.typeMessage;
        if (props.msgs) {
            if (typeMessage === 'received') {
                if (props.token) {
                    const decoded = jwt.decode(props.token);
                    if (decoded !== null && typeof decoded !== "string") {
                        let msgsReceived = props.msgs.filter(m => m.id_player_destiny === decoded.id_player);
                        if (msgsReceived.length > 0) {
                            console.log("hay msg recibidos y los guardo");
                            // setMessagesSent([]);
                            // setMessagesReceived(msgsReceived);
                            setMessagesHooks(msgsReceived);
                        } else {
                            console.log("no hay mensajes recibidos");
                        }

                    } else {
                        console.log("no se ha podido decodificar token")
                    }
                } else {
                    console.log("no hay token");
                }
            } else if (typeMessage === 'sent') {
                if (props.token) {
                    const decoded = jwt.decode(props.token);
                    if (decoded !== null && typeof decoded !== "string") {
                        let msgsSent = props.msgs.filter(m => m.id_player_sent === decoded.id_player);
                        if (msgsSent.length > 0) {
                            console.log("hay msg enviado y los guardo");
                            // setMessagesReceived([]);
                            // setMessagesSent(msgsSent);
                            setMessagesHooks(msgsSent);
                        } else {
                            console.log("no hay mensajes enviados");
                        }

                    } else {
                        console.log("no se ha podido decodificar token")
                    }
                } else {
                    console.log("no hay token");
                }
            }
            // {
            //     console.log("la url no es received");
            // }
        }
    }, [props.match.params.typeMessage]);

    console.log("mensajes received:");
    console.log(messagesReceived);
    console.log(messageSent);
    console.log("mensajes sent:");

    const decoded = jwt.decode(props.token);
    let id: number;
    let username: string;
    if (decoded && typeof decoded !== 'string') {
        id = decoded.id_player;
        username = decoded.username
    }

    return (

        <div className="col-12">
            {/* map lista de correos */}

            {/* {(messagesReceived && messagesReceived.map(m =>
                <div className="row">
                    <div className="col">
                        De: {m.id_player_sent}
                    </div>
                    <div className="col">
                        Text: {m.text}
                    </div>
                </div>
            )) || (messageSent && messageSent.map(m =>
                <div className="row">
                    <div className="col">
                        De: {m.id_player_sent}
                    </div>
                    <div className="col">
                        Text: {m.text}
                    </div>
                </div>
            ))} */}


            {messagesHooks && messagesHooks.map(m =>
                // <Link to={"/mailTray/"+props.match.params.typeMessage + "/" + m.id_messages} >
                <div  >

                    <div className="row" key={m.id_messages} onClick={() => viewMsg(m.id_messages)}>
                        <div className="col">
                            {/* {m.id_player_sent} */}
                            De: {m.id_player_sent === id ? username : m.username}
                        </div>
                        <div className="col">
                            {/* {m.id_player_destiny} */}
                            To: {m.id_player_destiny === id ? username : m.username}
                        </div>
                        <div className="col">
                            Asunto: {m.subject}
                        </div>
                        <div className="col">
                            Fecha: {m.date}
                        </div>
                        <div className="col">
                            Visto: {m.watched ? "SI" : "NO"}
                        </div>
                    </div>
                </div>

            )}

        </div >
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    msgs: state.msgs

});

const mapDispachToProps = {
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListMail);

