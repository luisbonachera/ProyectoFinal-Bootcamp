import React from 'react';
import { IMsg } from '../interfaceIMsg';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';
import { Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import { Badge } from 'react-bootstrap';


interface IPropsGlobal {
    msgs: IMsg[];
    player: IPlayer;
}
const MailDetail: React.FC<IPropsGlobal & RouteComponentProps<{ typeMessage: string, id_message: string }>> = props => {

    //deberia de recoger de la store el message

    const id_msg = props.match.params.id_message;
    const typeMsg = props.match.params.typeMessage;
    const message = props.msgs.filter(m => m.id_messages === +id_msg);
    console.log(props.msgs);
    if (message.length < 1 || message.length > 1) {
        console.log("El mensaje " + id_msg + " no existe");
        return null
    }
    return (
        <div className="col detalleMensaje">
            <div className="col-1 colum">
                <img className="imgAvatarMsg" src={message[0].avatar ? "http://localhost:8080/uploads/avatar/" + message[0].avatar : "/images/avatar-tenis.png"}
                    alt="" width="auto" height="50" />
            </div>
            <div className="col-2 colum ">
            {typeMsg === "received" ? message[0].username : props.player.username}
            </div>
            {/* <div className="row">
                From: {typeMsg === "received" ? message[0].username : props.player.username}
            </div>
            <div className="row">
                To: {typeMsg === "sent" ? message[0].username : props.player.username}
            </div> */}
            <div className="row">
                Asunto: {message[0].subject}
            </div>
            <div className="row">
                <Badge className="badge-date" variant="secondary">
                    {new Date(message[0].date).toLocaleString()}
                </Badge>
            </div>
            <div className="row">
                text: {message[0].text}
            </div>
            {typeMsg === "received" &&
                <div className="row">
                    <Link to={"/mailTray/add/" + message[0].id_player_sent}> Responder </Link>
                </div>
            }

            {/* <div className="row"> */}
            {/* responder con boton a add Message */}
            {/* </div> */}
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    msgs: state.msgs,
    player: state.player

});

// const mapDispachToProps = {
//     setMessages: actions.setMessages
// }

export default connect(
    mapStateToProps
)(MailDetail);

