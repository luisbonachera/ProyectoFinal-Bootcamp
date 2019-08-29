import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { IPlayer } from '../interfaceIPlayer';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers/reducers';

interface IPropsGloblal {
    token: string;
    // players: IPlayer[];
    player: IPlayer;
    // setMessages: (msgs: IMsg[]) => void;
    // setPlayer: (player: IPlayer) => void;
}

const MenuMail: React.FC<IPropsGloblal> = props => {

    let decode: any;
    if (props.token) {
        decode = jwt.decode(props.token);
    }


    return (
        <Fragment>
            <ul className="MenuMensajes">
                <li>
                    {decode && decode.id_player && (
                        <Link className="text divIconAndNameMenuMensaje" to={"/mailTray/add/" + decode.id_player}>
                            <i className="material-icons iconMenuMensajes md-48">add_box</i>
                            <p className="menuMensajesP"> <span>Nuevo</span> </p>
                        </Link>
                    )}
                </li>
                <li>
                    <Link className="text divIconAndNameMenuMensaje" to="/mailTray/received">
                        <i className="material-icons iconMenuMensajes md-48">mail</i>
                        <p className="menuMensajesP"> <span>Recibidos</span> </p>
                        
                    </Link>
                </li>
                <li>
                    <Link className="text divIconAndNameMenuMensaje" to="/mailTray/sent">
                    <i className="material-icons iconMenuMensajes md-48">send</i>
                    <p className="menuMensajesP"> <span>Enviados</span> </p>
                        
                    </Link>
                </li>
            </ul>


        </Fragment>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    token: state.token,
    player: state.player

});

// const mapDispachToProps = {
//     setMessages: actions.setMessages
// }

export default connect(
    mapStateToProps
)(MenuMail);