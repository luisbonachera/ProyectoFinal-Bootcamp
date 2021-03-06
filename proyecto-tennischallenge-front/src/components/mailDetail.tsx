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

    const id_msg = props.match.params.id_message;
    const typeMsg = props.match.params.typeMessage;
    let message:any = props.msgs.filter(m => m.id_messages === +id_msg);

    React.useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        message = props.msgs.filter(m => m.id_messages === +id_msg);
    }, [props.msgs])

    if (message.length < 1 || message.length > 1) {
        return null
    }

    return (
        <div className="col containerMessageDetails">
            <div className="row container">
                {typeMsg === "received" &&
                <div className="col-1 colum" >
                    <p className="usernameMailFrom" >De: </p>
                </div>
                }
                 {typeMsg === "sent" &&
                <div className="col-1 colum" >
                    <p className="usernameMailFrom" >Para: </p>
                </div>
                 }
                <div className="col-1 colum">
                    <img className="imgAvatarMsg" src={message[0].avatar ? "http://localhost:8080/uploads/avatar/" + message[0].avatar : "/images/avatar-tenis.png"}
                        alt="" width="auto" height="50" />
                </div>
                <div className="col-1 colum ">
                    <p className="usernameMailFrom text-capitalize">{message[0].username.toLocaleLowerCase()}</p>
                </div>
                <div className="col-6"></div>
                <div className="col-3 containerDateMessageDetail">
                    <Badge className="badge-date" variant="secondary">
                        {new Date(message[0].date).toLocaleString()}
                    </Badge>
                </div>
            </div>
            <div className="row container">
                <div className="col containerSubjectDetail">
                    Asunto: {message[0].subject}
                </div>
            </div>
            <div className="row container">
                <div className="col containerSubjectDetail">
                    {message[0].text}
                </div>
            </div>
            {typeMsg === "received" &&
                <div className="row container">
                    <div className="col containerButtonSend">
                        <Link className="butttonRespondMessage" to={"/mailTray/add/" + message[0].id_player_sent}> Responder </Link>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    msgs: state.msgs,
    player: state.player

});

export default connect(
    mapStateToProps
)(MailDetail);

