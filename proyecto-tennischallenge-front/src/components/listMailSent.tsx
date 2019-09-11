import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import { Badge } from 'react-bootstrap';
import { INotifications } from '../interfaceINotifications';


interface IPropsGloblal {
    token: string,
    player: IPlayer,
    msgs: IMsg[],
    setMessages: (msgs: IMsg[]) => void;
    notifications: INotifications;
}

const ListMailSent: React.FC<IPropsGloblal & RouteComponentProps> = props => {

    const [error, setError] = React.useState("");
    const [messagesHooks, setMessagesHooks] = React.useState<IMsg[]>([]);


    useEffect(() => {
        if (props.msgs) {
            if (props.token) {
                const decoded = jwt.decode(props.token);
                if (decoded !== null && typeof decoded !== "string") {
                    ////mirar y cambiar y descomentar/////////////////////////////////////////////////////
                    let msgsSent = props.msgs.filter(m => m.id_player_sent === decoded.id_player);
                    // let msgsReceived = props.msgs.filter(m => m.id_player_sent === decoded.id_player);
                    // console.log(msgsSent);
                    if (msgsSent.length > 0) {
                        // console.log("hay msg enviados y los guardo");
                        // setMessagesSent([]);
                        // setMessagesReceived(msgsReceived);
                        setError("");
                        setMessagesHooks(msgsSent);

                        // console.log("msgsSent");
                        // console.log(msgsSent);
                    } else {
                        // console.log("error:");
                        // console.log("no hay mensajes enviados");
                        setError("No tienes mensajes enviados");
                        // props.history.push("/mailTray/received");
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
    }, [props.msgs, props.notifications]);

    if (!props.msgs) {
        // console.log("no hay mensajes en la store");
        setError("No tienes mensajes Enviados.")
        return null;
    }

    // console.log("mensajes sent fuera de useEffect:");
    // console.log(messagesHooks);

    if (!props.player) {
        return null;
    }

    return (
        <div className="col receivedOrSent">
            {/* {messagesHooks.length > 0 &&
                <div className="row" >
                    <div className="col-2 colum colBorder">
                        Para:
                    </div>
                    <div className="col-7 colum colBorder">
                        Asunto
                    </div>
                    <div className="col-2 colum colBorder">
                        Fecha
                    </div> */}
            {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
            {/* <div className="col-1 colum colBorder">
                        Visto
                    </div>
                </div>
            } */}
            {messagesHooks.length > 0 && messagesHooks.map((m:any) =>
                // <Link to={"/mailTray/"+props.match.params.typeMessage + "/" + m.id_messages} >
                // los mensajes received y no vistos son los que se deberian de poner de otro color
                <Link key={m.id_messages} to={"/mailTray/sent/" + m.id_messages}>

                    <div   >

                        <div className="row messageResume colBorder">
                            {/* <div className="col">
                                {/* {m.id_player_sent} }
                                From: {props.player.username}
                            </div> */}
                            <div className="col-1 colum ">
                                <img className="imgAvatarMsg" src={m.avatar ? "http://localhost:8080/uploads/avatar/" + m.avatar : "/images/avatar-tenis.png"}
                                    alt="" width="auto" height="50" />
                            </div>
                            <div className="col-2 colum text-capitalize">
                                {/* {m.id_player_destiny} to*/}
                                {m.username.toLocaleLowerCase()}
                            </div>
                            <div className="col-6 colum ">
                                {m.subject}
                            </div>
                            <div className="col-2 colum ">
                                <Badge className="badge-date" variant="secondary">
                                    {new Date(m.date).toLocaleDateString()}
                                </Badge>
                            </div>
                            {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
                            <div className="col-1 colum ">
                                <Badge className="badge-mailSent-watched">
                                    {m.watched ? <i className="material-icons blue300">done_all</i> : <i className="material-icons green600">done</i>
                                    }
                                </Badge>

                            </div>
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
    player: state.player,
    notifications: state.notifications


});

const mapDispachToProps = {
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListMailSent);