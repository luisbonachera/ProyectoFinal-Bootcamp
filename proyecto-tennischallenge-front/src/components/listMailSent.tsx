import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';


interface IPropsGloblal {
    token: string,
    player: IPlayer,
    msgs: IMsg[],
    setMessages: (msgs: IMsg[]) => void;
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
                        console.log(msgsSent);
                        if (msgsSent.length > 0) {
                            console.log("hay msg recibidos y los guardo");
                            // setMessagesSent([]);
                            // setMessagesReceived(msgsReceived);
                            setError("");
                            setMessagesHooks(msgsSent);
                            
                            console.log("msgsSent");
                            console.log(msgsSent);
                        } else {
                            console.log("error:");
                            console.log("no hay mensajes enviados");
                            setError("no hay mensajes enviados");
                            // props.history.push("/mailTray/received");
                        }

                    } else {
                        console.log("no se ha podido decodificar token")
                    }
                } else {
                    console.log("no hay token");
                }
            }else{
                setError("no hay mensajes en la store, haciendo UseEffect.");
            }
    }, [props.msgs]);

    if(!props.msgs){
        console.log("no hay mensajes en la store");
        setError("No tienes mensajes Enviados.")
        return null;
    }

    console.log("mensajes sent fuera de useEffect:");
    console.log(messagesHooks);

    if (!props.player) {
       return null;
    }
    
    return (

        <div className="col-12">
            {messagesHooks && messagesHooks.map(m =>
                // <Link to={"/mailTray/"+props.match.params.typeMessage + "/" + m.id_messages} >
                // los mensajes received y no vistos son los que se deberian de poner de otro color
                <Link key={m.id_messages} to={"/mailTray/sent/" + m.id_messages}>
                <div   >

                    <div className="row">
                        <div className="col">
                            {/* {m.id_player_sent} */}
                            From: {props.player.username}
                        </div>
                        <div className="col">
                            {/* {m.id_player_destiny} */}
                            To: {m.username}
                        </div>
                        <div className="col">
                            Asunto: {m.subject}
                        </div>
                        <div className="col">
                            Fecha: {new Date(m.date).toLocaleString()}
                        </div>
                        {/* esto cuanto haya colores en la lista de los msgs lo deberia quitar */}
                        <div className="col">
                            Visto: {m.watched ? "SI" : "NO"}
                        </div>
                    </div>
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
)(ListMailSent);