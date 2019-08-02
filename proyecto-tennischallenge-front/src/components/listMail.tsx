import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { setMessages } from '../actions/actions';
import { messagesReducer } from '../reducers/messagesReducer';

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
    // const listMsgs = () => {
    //     if (props.token) {
    //         let decoded = jwt.decode(props.token);
    //         if (decoded !== null) {
    //             console.log(decoded);

    //             fetch("http://localhost:8080/api/msgs", {
    //                 headers: {
    //                     "Content-type": "application/json",
    //                     Authorization: "Bearer " + props.token
    //                 }
    //             })
    //                 .then(response => {
    //                     if (response.ok) {
    //                         response
    //                             .json()
    //                             .then((lista: IMsg[]) => {
    //                                 console.log(lista);
    //                                 console.log("va bien");
    //                                 props.setMessages(lista);
    //                                 console.log(lista);
    //                             })
    //                             .catch(err => {
    //                                 setError("Error en el json.");
    //                             });
    //                     } else {
    //                         setError("responde.ok da error.");
    //                     }
    //                 })
    //                 .catch(err => {
    //                     setError("Error en response.");
    //                 });
    //         }
    //         else {
    //             setError("El token no se pudo decodificar");
    //         }
    //     }
    //     else {
    //         setError("El token no existe");
    //     }
    // };
    // console.log("username " + inputUsername);
    // console.log("city " + inputCity);
    // console.log("genre " + inputSex);
    // console.log("ratingFrom " + inputRatingFrom);
    // console.log("ratingTo " + inputRatingTo);
    // console.log("errorRating" + errorRating);
    // console.log("error" + error);


    // React.useEffect(listMsgs, []);

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
                <div className="row">
                    <div className="col">
                        De: {m.id_player_sent}
                    </div>
                    <div className="col">
                        Text: {m.text}
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

