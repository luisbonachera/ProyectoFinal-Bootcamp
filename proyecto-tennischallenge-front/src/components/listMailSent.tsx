import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { IMsg } from '../interfaceIMsg';
import * as actions from '../actions/actions';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';


interface IPropsGloblal {
    token: string,
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
                            console.log("error:" + error);
                            console.log("msgsSent");
                            console.log(msgsSent);
                        } else {
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

    const decoded = jwt.decode(props.token);
    let myUsername: string;
    if (decoded && typeof decoded !== 'string') {
        myUsername = decoded.username
    }
    
    return (

        <div className="col-12">
            {messagesHooks && messagesHooks.map(m =>
                // <Link to={"/mailTray/"+props.match.params.typeMessage + "/" + m.id_messages} >
                // los mensajes received y no vistos son los que se deberian de poner de otro color
                <Link to={"/mailTray/sent/" + m.id_messages}>
                <div key={m.id_messages}  >

                    <div className="row">
                        <div className="col">
                            {/* {m.id_player_sent} */}
                            From: {myUsername}
                        </div>
                        <div className="col">
                            {/* {m.id_player_destiny} */}
                            To: {m.username}
                        </div>
                        <div className="col">
                            Asunto: {m.subject}
                        </div>
                        <div className="col">
                            Fecha: {m.date}
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
    msgs: state.msgs

});

const mapDispachToProps = {
    setMessages: actions.setMessages
}

export default connect(
    mapStateToProps,
    mapDispachToProps
)(ListMailSent);